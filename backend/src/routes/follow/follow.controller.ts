import express from 'express';
import { Op } from "sequelize";
import { Follow } from '../../models/Follow';

const profileFormat = ['id', 'username', 'thumbnail'];

class FollowController {

  // 특정 사용자 팔로우
  public followUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { user: { profile } } = req.body;
    const target = parseInt(req.params.target);
    const me = profile.id;
    if (me === target) {
      res.sendStatus(500);
    }
    try {
      const existing = await Follow.findOne({
        where: {
          [Op.or]: [
            { followingId: target, followerId: me },
            { followingId: me, followerId: target },
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
        followingId: target
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


  // 팔로우 수락 
  public rejectFollow = async (
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
          { association: 'following', attributes: profileFormat },
          { association: 'follower', attributes: profileFormat }
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
