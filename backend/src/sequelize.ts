import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { config } from './config';

const env = process.env.NODE_ENV || 'development';

export const sequelize = new Sequelize({
  ...(<any>config)[env],
  operatorsAliases: Op,
  models: [__dirname + '/models'],
});
