import express from 'express';
import UserController from './user.controller';

const user = express.Router();

user.get('/search', UserController.getUserProfileList);
user.get('/:id', UserController.getUserInfo);
user.patch('/', UserController.modifyMyUserInfo);

export default user;
