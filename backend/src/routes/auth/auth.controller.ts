import express from 'express';
import Joi from 'joi';
import { setCookie } from '../../lib/token';
import { Account } from '../../models/Account';

class AuthController {
  /**
   * 사용자의 로그인 데이터를 검증
   * @param profile
   */
  public validateLoginProfile(profile: any) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .allow(null),
      snsId: Joi.string().required(),
      thumbnail: Joi.string(),
      username: Joi.string().required(),
    });
    return Joi.validate(profile, schema);
  }

  /**
   * 유저 정보를 가져온다. 없으면 생성 한다.
   * @param profile
   * @param provider
   */
  public async getAccount(
    profile: {
      email: string;
      snsId: string;
      thumbnail: string;
      username: string;
    },
    provider: 'kakao' | 'google' | 'naver'
  ) {
    const { email, snsId, thumbnail, username } = profile;
    let user = await Account.findOne({ where: { snsId, provider } });
    if (!user) {
      user = await Account.create({
        email,
        provider,
        snsId,
        thumbnail,
        username,
      });
    }
    return user;
  }

  // Google 로그인
  public googleLogin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const {
      body: { profile },
    } = req;
    const validation = this.validateLoginProfile(profile);
    if (validation.error) {
      return next(validation.error);
    }

    try {
      const user = await this.getAccount(profile, 'google');
      const token = await user.generateToken();
      setCookie(res, token);
      return res.json(user.profile);
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
    const {
      body: { profile },
    } = req;
    const validation = this.validateLoginProfile(profile);
    if (validation.error) {
      return next(validation.error);
    }

    try {
      const user = await this.getAccount(profile, 'naver');
      const token = await user.generateToken();
      setCookie(res, token);
      return res.json(user.profile);
    } catch (error) {
      return next(error);
    }
  };

  // Kakao 로그인
  public kakaoLogin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const {
      body: { profile },
    } = req;
    const validation = this.validateLoginProfile(profile);
    if (validation.error) {
      return next(validation.error);
    }

    try {
      const user = await this.getAccount(profile, 'kakao');
      const token = await user.generateToken();
      setCookie(res, token);
      return res.json(user.profile);
    } catch (error) {
      return next(error);
    }
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
    const {
      user: { profile },
    } = req.body;

    if (!profile) {
      return next();
    }
    res.json(profile);
  };
}

export default new AuthController();
