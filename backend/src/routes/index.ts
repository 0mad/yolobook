import express from 'express';
import auth from './auth';
import user from './user';
import post from './post';

const routes = express.Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/post', post);

export default routes;
