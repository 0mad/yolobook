import express from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret: any = process.env.JWT_SECRET;

/**
 * JWT 토큰 생성
 * @param {any} payload
 * @returns {string} token
 */

export const generateToken = async (payload: any) => {
  try {
    return jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
  } catch (error) {
    throw error;
  }
};

const decodeToken = async (token: string) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw error;
  }
};

export const jwtMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies['access_token']; // ctx 에서 access_token 을 읽어옵니다
  if (!token) return next(); // 토큰이 없으면 바로 다음 작업을 진행합니다.

  try {
    const decoded: any = await decodeToken(token); // 토큰을 디코딩 합니다

    // 토큰 만료일이 하루밖에 안남으면 토큰을 재발급합니다
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      // 하루가 지나면 갱신해준다.
      const { _id, profile } = decoded;
      const freshToken = await generateToken({ _id, profile });
      res.cookie('access_token', freshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
      });
    }

    // ctx.request.user 에 디코딩된 값을 넣어줍니다
    req.body.user = decoded;
  } catch (e) {
    // token validate 실패
    req.body.user = null;
  }

  return next();
};
