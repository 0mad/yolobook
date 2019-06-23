import express from 'express';
import AuthController from './auth.controller';

const auth = express.Router();

auth.post('/login/google', AuthController.googleLogin);
auth.post('/login/naver', AuthController.naverLogin);
auth.post('/login/kakao', AuthController.kakaoLogin);
auth.post('/logout', AuthController.logout);
auth.get('/check', AuthController.check);

export default auth;
