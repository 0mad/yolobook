import express from 'express';

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

  // 특정 사용자 팔로우
  public followUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('특정 사용자 팔로우');
  };

  // 특정 사용자 팔로우 취소
  public cancelFollowUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('특정 사용자 팔로우 취소');
  };

  // 팔로우 한사람 사용자 정보 모두 가져오기
  public getFollowList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('팔로우 한사람 사용자 정보 모두 가져오기');
  };

  // 나를 팔로우하는 사용자 정보 리스트 가져오기
  public getFollowingList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('나를 팔로우하는 사용자 정보 리스트 가져오기');
  };
}

export default new UserController();
