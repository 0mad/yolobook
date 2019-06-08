import express from 'express';

class AuthController {
  // Google 로그인
  public googleLogin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('google login');
  };

  // Naver 로그인
  public naverLogin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('naver login');
  };

  // Kakao 로그인
  public kakaoLogin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('kakao login');
  };

  // 로그아웃
  public logout = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.cookie('access_token', null, {
      httpOnly: true,
      maxAge: 0,
    });
    res.sendStatus(204);
  };

  // 쿠키에 access_token 이 있다면, 현재 로그인된 유저의 정보를 응답
  public check = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('check');
  };
}

export default new AuthController();
