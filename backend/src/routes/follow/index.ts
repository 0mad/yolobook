import express from 'express';
import followController from './follow.controller';

const user = express.Router();

user.post('/:userId', followController.followUser);
user.patch('/:followId/accept', followController.acceptFollow);
user.patch('/:followId/reject', followController.rejectFollow);
user.delete('/:followId', followController.cancelFollowUser);
user.get('/', followController.getFollowList);

export default user;
