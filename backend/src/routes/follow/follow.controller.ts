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
    const targetId = parseInt(req.params.targetId);
    const me = profile.id;
    if (me === targetId) {
      res.sendStatus(500);
    }
    try {
      const existing = await Follow.findOne({
        where: {
          [Op.or]: [
            { followingId: targetId, followerId: me },
            { followingId: me, followerId: targetId },
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
        followingId: targetId
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
          ]
        }
      });
    } catch (error) {
      next(error);
    }
    res.status(200);
    res.send({
      followList: followList || [],
      id: profile.id
    });
    return res;
  }
}

export default new FollowController();
