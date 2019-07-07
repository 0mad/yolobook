import express from 'express';
import { Op } from "sequelize";
import { Account } from '../../models/Account';
import { Follow } from '../../models/Follow';

const Status = {
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  REQUESTING: 'REQUESTING',
}

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
      const follow = await Follow.create({
        followerId: me,
        followingId: userId
      });
      const following = await Account.findOne({
        where: {
          id: userId
        }
      });

      res.json({
        createdAt: follow.createdAt,
        id: follow.id,
        profile: following!.profile,
        status: follow.status,
      });
    } catch (error) {
      next(error);
    }
    return res;
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
          status: Status.REQUESTING
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
        status: Status.ACCEPTED
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
        status: Status.REJECTED
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
          status: Status.REQUESTING
        }
      });
    } catch (error) {
      next(error);
    }

    const status = result === 1 ? 200 : 500;
    return res.sendStatus(status);
  };

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
        }
      });
    } catch (error) {
      next(error);
    }

    const followerList: any[] = [];
    const followingList: any[] = [];
    const acceptedList: any[] = [];

    if (followList) {
      followList.forEach(follow => {
        if (follow.status === Status.ACCEPTED) {
          acceptedList.push({
            profile: follow.following.id === profile.id ? follow.follower : follow.following
          });
        } else if (follow.follower.id === profile.id) {
          followingList.push(follow);
        } else {
          followerList.push(follow);
        }
      });
    }

    res.send({
      acceptedList,
      followerList,
      followingList,
    });
    return res;
  }

  public getAcceptFollowList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const userId = parseInt(req.params.userId);
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
            { followerId: userId },
            { followingId: userId }
          ],
          status: Status.ACCEPTED
        }
      });
    } catch (error) {
      next(error);
    }

    const acceptedList: any[] = [];

    if (followList) {
      followList.forEach(follow => {
        acceptedList.push(
          follow.following.id === userId ? follow.follower : follow.following
        );
      });
    }

    res.send(acceptedList);
    return res;
  }
}

export default new FollowController();
