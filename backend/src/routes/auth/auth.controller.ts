import express from 'express';
import Joi from 'joi';
import { Account } from '../../models/Account';

class AuthController {
  // Google 로그인
  public googleLogin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const {
      username,
      thumbnail,
      snsId,
      email,
    } = req.body;
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      snsId: Joi.string().required(),
      thumbnail: Joi.string(),
      username: Joi.string().required(),
    });

    const result = Joi.validate({ username, thumbnail, email, snsId }, schema);
    if (result.error) {
      return next(result.error);
    }

    let existing = null;
    try {
      existing = await Account.findOne({ where: { snsId, provider: 'google' } });
    } catch (error) {
      return next(error);
    }

    let token = null;
    if (existing) {
      try {
        token = await existing.generateToken();
        this.setCookie(res, token);
      } catch (error) {
        return next(error);
      }
      return res.json(existing.profile);
    }

    try {
      const newUser = await Account.create({
        ...req.body,
        provider: 'google'
      });
      token = await newUser.generateToken();
      this.setCookie(res, token);
      return res.json(newUser.profile);
    } catch (error) {
      return next(error);
    }
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
    const { profile } = req.body;

    if (!profile) {
      return next();
    }
    res.json(profile);
  };

  private setCookie(res: express.Response, token: string) {
    res.cookie('access_token', token, { httpOnly: true, maxAge: 100 * 60 * 60 * 24 * 7 });
  };
}

export default new AuthController();
