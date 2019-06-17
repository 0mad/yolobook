import express from 'express';
import auth from './auth';
import follow from './follow';
import post from './post';
import user from './user';

const routes = express.Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/post', post);
routes.use('/follow', follow);

export default routes;
