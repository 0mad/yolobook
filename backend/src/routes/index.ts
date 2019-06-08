import express from 'express';
import auth from './auth';
import user from './user';

const routes = express.Router();

routes.use('/auth', auth);
routes.use('/user', user);

export default routes;
