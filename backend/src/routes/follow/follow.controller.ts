import express from 'express';
import { Op } from "sequelize";
import { Follow } from '../../models/Follow';

class FollowController {

  // 특정 사용자 팔로우
  public followUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { user: { profile } } = req.body;
    const userId = parseInt(req.params.userId);
    const me = profile.id;
    if (me === userId) {
      res.sendStatus(500);
    }
    try {
      const existing = await Follow.findOne({
        where: {
          [Op.or]: [
            { followingId: userId, followerId: me },
            { followingId: me, followerId: userId },
          ]
        }
      });
      if (existing) {
        return res.sendStatus(200);
      }
    } catch (error) {
      next(error);
    }

    try {
      await Follow.create({
        followerId: me,
        followingId: userId
      });
    } catch (error) {
      next(error);
    }

    return res.sendStatus(201);
  };

  // 팔로우 수락 
  public acceptFollow = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { user: { profile } } = req.body;
    const followId = parseInt(req.params.followId);
    const me = profile.id;

    let follow;
    try {
      follow = await Follow.findOne({
        where: {
          followingId: me,
          id: followId,
          status: "REQUESTING"
        }
      });
    } catch (error) {
      next(error);
    }

    if (!follow) {
      return res.sendStatus(500);
    }

    try {
      follow.update({
        status: 'ACCEPTED'
      });
    } catch (error) {
      next(error);
    }
    return res.sendStatus(200);
  };

  // 팔로우 거절
  public rejectFollow = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const followId = parseInt(req.params.followId);

    let follow;
    try {
      follow = await Follow.findOne({
        where: {
          id: followId,
        }
      });
    } catch (error) {
      next(error);
    }

    if (!follow) {
      return res.sendStatus(500);
    }

    try {
      follow.update({
        status: 'REJECT'
      });
    } catch (error) {
      next(error);
    }
    return res.sendStatus(200);
  };

  // 팔로우 요청 취소
  public cancelFollowUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { user: { profile } } = req.body;
    const followId = parseInt(req.params.followId);
    const me = profile.id;

    let result;
    try {
      result = await Follow.destroy({
        where: {
          followerId: me,
          id: followId,
          status: 'REQUESTING'
        }
      });
    } catch (error) {
      next(error);
    }

    const status = result === 1 ? 200 : 500;
    return res.sendStatus(status);
  };


  public getAcceptedFollowList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const userId = parseInt(req.params.userId);
    let followList: any[] = [];
    try {
      followList = await Follow.findAll({
        attributes: ['id', 'createdAt'],
        include: [
          { association: 'following', attributes: ['id', 'username', 'thumbnail'] },
          { association: 'follower', attributes: ['id', 'username', 'thumbnail'] }
        ],
        where: {
          [Op.or]: [
            { followerId: userId },
            { followingId: userId }
          ],
          status: 'ACCEPTED'
        }
      });
    } catch (error) {
      next(error);
    }

    if (followList.length > 0) {
      followList = followList.map(follow => ({
        id: follow.id,
        profile: follow.following.id === userId ? follow.follower : follow.following
      }));
    }

    res.send(followList);
    return res;
  }

  public getFollowList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { user: { profile } } = req.body;
    let followList;
    try {
      followList = await Follow.findAll({
        attributes: ['id', 'status', 'createdAt'],
        include: [
          { association: 'following', attributes: ['id', 'username', 'thumbnail'] },
          { association: 'follower', attributes: ['id', 'username', 'thumbnail'] }
        ],
        where: {
          [Op.or]: [
            { followerId: profile.id },
            { followingId: profile.id }
          ],
          status: 'REQUESTING'
        }
      });
    } catch (error) {
      next(error);
    }

    const followerList: any[] = [];
    const followingList: any[] = [];

    if (followList) {
      followList.forEach(follow => {
        if (follow.follower.id === profile.id) {
          followingList.push(follow);
        } else {
          followerList.push(follow);
        }
      });
    }

    res.send({
      followerList,
      followingList
    });
    return res;
  }
}

export default new FollowController();
