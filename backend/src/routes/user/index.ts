import express from 'express';
import { multerUpload } from '../../lib/multer';
import { isLoggedIn } from '../middlewares';
import UserController from './user.controller';

const user = express.Router();

user.get('/search/:search', isLoggedIn, UserController.getUserProfileList);
user.get('/search/', isLoggedIn, UserController.getUserProfileList);
user.get('/:id', isLoggedIn, UserController.getUserInfo);
user.patch('/', isLoggedIn, UserController.modifyMyUserInfo);
user.patch(
  '/cover',
  isLoggedIn,
  multerUpload.single('cover-img'),
  UserController.modifyCoverImg
);

export default user;
