import express from 'express';
import auth from './auth';

const routes = express.Router();

routes.use('/auth', auth);

export default routes;
