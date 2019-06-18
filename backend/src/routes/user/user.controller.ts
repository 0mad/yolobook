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
    let userProfileList;
    try {
      userProfileList = await Account.findAll({
        attributes: ['id', 'username', 'thumbnail']
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
}

export default new UserController();
