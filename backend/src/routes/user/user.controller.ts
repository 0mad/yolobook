import express from 'express';
import { setCookie } from '../../lib/token';
import { Account } from '../../models/Account';

class UserController {
  // 특정 사용자 정보 가져오기
  public getUserInfo = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = req.params;
    try {
      let user: Account | null;
      user = await Account.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return next(new Error('Not exist account'));
      }
      res.json(user.profile);
    } catch (error) {
      next(error);
    }
  };

  // 나의 정보 수정
  public modifyMyUserInfo = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { user: { profile: { id } }, } = req.body;
    let user;
    try {
      user = await Account.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
    if (!user) {
      return next(new Error('Not exist account'));
    }
    ['user', 'snsId', 'provider', 'createdAt', 'updatedAt', 'email', 'id']
      .forEach(property => delete req.body[property]);

    try {
      await user.update({
        ...req.body
      });
      return res.json(user.profile);
    } catch (error) {
      return next(new Error('update fail'));
    }
  };

  // 사용자의 프로필 리스트를 가져온다. 검색하기에 사용하는데, 현재는 모든 사용자를 가져온다.
  public getUserProfileList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let userProfileList;
    try {
      userProfileList = await Account.findAll({
        attributes: ['id', 'username', 'thumbnail', 'coverImg'],
      });
    } catch (error) {
      return next(error);
    }
    if (userProfileList) {
      res.json(userProfileList);
    } else {
      res.json([]);
    }
    return res;
  };

  // 커버 이미지 수정
  public modifyCoverImg = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = req.body;
    const coverImg: any = req.file;
    if (!coverImg) {
      return next(new Error('Not exist cover image'));
    }

    try {
      let user: Account | null;
      user = await Account.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return next(new Error('Not exist account'));
      }
      user.update({
        coverImg: `/img/${coverImg.filename}`,
      });
      const token = await user.generateToken();
      setCookie(res, token);
      res.json(user.profile);
    } catch (error) {
      next(error);
    }
  };

  // 썸네일 이미지 수정
  public modifyThumbnailImg = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = req.body;
    const thumbnailImg: any = req.file;
    if (!thumbnailImg) {
      return next(new Error('Not exist cover image'));
    }

    try {
      let user: Account | null;
      user = await Account.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return next(new Error('Not exist account'));
      }
      user.update({
        thumbnail: `/img/${thumbnailImg.filename}`,
      });
      const token = await user.generateToken();
      setCookie(res, token);
      res.json(user.profile);
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
