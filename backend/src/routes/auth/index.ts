import express from 'express';
import AuthController from './auth.controller';
// import RefAuthController from './ref.auth.controller';

const auth = express.Router();

auth.post('/login/google', AuthController.googleLogin);
auth.post('/login/naver', AuthController.naverLogin);
auth.post('/login/kakao', AuthController.kakaoLogin);
auth.post('/logout', AuthController.logout);
auth.get('/check', AuthController.check);

// 아래는 참고 예제
// auth.post('/register/local', RefAuthController.localRegister);
// auth.post('/login/local', RefAuthController.localLogin);
// auth.get('/exists/:key(email|username)/:value', RefAuthController.exists); // key가 email이거나 username일 때만 허용
// auth.post('/logout', RefAuthController.logout);
// auth.get('/check', RefAuthController.check);

export default auth;
