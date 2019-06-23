import appRoot from 'app-root-path';
import express from 'express';
import multer from 'multer';
import path from 'path';

export const multerUpload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(appRoot.path, 'uploads/'));
    },
    filename(req: express.Request, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    },
  }),
});
