import express from 'express';
import AuthController from './auth.controller';

const auth = express.Router();
auth.post('/register/local', AuthController.localRegister);
auth.post('/login/local', AuthController.localLogin);
auth.get('/exists/:key(email|username)/:value', AuthController.exists); // key가 email이거나 username일 때만 허용
auth.post('/logout', AuthController.logout);
auth.get('/check', AuthController.check);

export default auth;
