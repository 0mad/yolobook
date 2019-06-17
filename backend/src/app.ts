require('dotenv').config(); // .env 파일에서 환경변수 불러오기

import appRoot from 'app-root-path';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import fs from 'fs';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan = require('morgan');
import path from 'path';
import { jwtMiddleware } from './lib/token';
import logger from './logger';
import routes from './routes';
import { sequelize } from './sequelize';

class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.serverSetting();
    this.middlewares();
  }

  public start = async () => {
    await sequelize.sync({ force: false });

    this.app.listen(this.app.get('port'), () => {
      logger.info(`${this.app.get('port')}번 포트에서 대기중`);
    });
  };

  private serverSetting = (): void => {
    this.app.set('port', process.env.PORT || 4000); // PORT 값이 설정되어있지 않다면 4000 을 사용합니다.
    const uploadsDirPath = path.join(appRoot.path, 'uploads');
    fs.readdir(uploadsDirPath, error => {
      if (error) {
        logger.error(
          'The uploads directory does not exist and will be created'
        );
        fs.mkdirSync(uploadsDirPath);
      }
    });
  };

  private middlewares = (): void => {
    if (process.env.NODE_ENV === 'production') {
      this.app.use(morgan('combined'));
      this.app.use(helmet());
      this.app.use(hpp());
    } else {
      this.app.use(morgan('dev'));
    }
    this.app.use(express.static(path.join(appRoot.path, 'public')));
    this.app.use('/img', express.static(path.join(appRoot.path, 'uploads')));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(jwtMiddleware);
    this.app.use('/api', routes);
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const err: any = new Error('Not Found');
        err.status = 404;
        logger.info('hello');
        logger.error(err.message);
        next(err);
      }
    );
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.sendStatus(err.status || 500);
      }
    );
  };
}

export default new App().start();
