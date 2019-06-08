import express from 'express';
import UserController from './user.controller';

const user = express.Router();

user.get('/:id', UserController.getUserInfo);
user.patch('/', UserController.modifyMyUserInfo);
user.post('/follow/:id', UserController.followUser);
user.delete('/follow/:id', UserController.cancelFollowUser);
user.get('/:id/follow', UserController.getFollowList);
user.get('/:id/following', UserController.getFollowingList);

export default user;
