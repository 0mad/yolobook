import express from 'express';
import { Account } from '../../models/Account';

class UserController {
  // 특정 사용자 정보 가져오기
  public getUserInfo = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('특정 사용자 정보 가져오기');
  };

  // 나의 정보 수정
  public modifyMyUserInfo = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('나의 정보 수정');
  };

  // 사용자의 프로필 리스트를 가져온다. 검색하기에 사용하는데, 현재는 모든 사용자를 가져온다.
  public getUserProfileList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userProfileList = await Account.findAll({
        attributes: ['id', 'username', 'thumbnail']
      });
      res.json(userProfileList);
    } catch (error) {
      return next(error);
    }
    res.send('나를 팔로우하는 사용자 정보 리스트 가져오기');
  };
}

export default new UserController();
