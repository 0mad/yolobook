import express from 'express';

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { profile } = req.body.user;

  if (profile) {
    return next();
  }

  const err: any = new Error('Not logged in');
  err.status = 404;
  return next(err);
};

export const isNotLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { profile } = req.body.user;

  if (!profile) {
    return next();
  }

  const err: any = new Error('logged in');
  err.status = 404;
  return next(err);
};
