import appRoot from 'app-root-path';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { Account } from '../../models/Account';
import { Post } from '../../models/Post';
import { PostImage } from '../../models/PostImage';

class UserController {
  public multerUpload = multer({
    limits: { fileSize: 5 * 1024 * 1024 },
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, path.join(appRoot.path, 'uploads/'));
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(
          null,
          path.basename(file.originalname, ext) + new Date().valueOf() + ext
        );
      },
    }),
  });

  public multerUpload2 = multer();

  // 이미지를 업로드하고 이미지를 얻을 수 있는 주소를 json으로 응답
  public uploadImg = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const imgs: any = req.files;
    const data: Array<object> = [];
    imgs.map((img: any) => {
      data.push({ url: `/img/${img.filename}` });
    });
    res.json(data);
  };

  // 계시글 리스트 가져오기
  public getPosts = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const posts = await Post.findAll({
      include: [Account, PostImage],
      order: [['createdAt', 'DESC']],
    });
    const data: any = [];
    posts.forEach((post: any) => {
      data.push(post.info);
    });
    res.json(data);
  };

  // 특정 사용자 아이디의 게시글 리스트 가져오기
  public getPost = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('특정 사용자 아이디의 게시글 리스트 가져오기');
  };

  // 게시글 작성
  public wrtiePost = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const {
      content,
      imgUrls,
      user: {
        profile: { id },
      },
    } = req.body;
    try {
      const post = await Post.create({
        content,
        accountId: id,
      });
      if (!!imgUrls) {
        for (const imgUrl of imgUrls) {
          await PostImage.create({ img: imgUrl.url, postId: post.id });
        }
      }
      const newPost: any = await Post.findOne({
        include: [PostImage, Account],
        where: {
          id: post.id,
        },
      });
      res.json(newPost.info);
    } catch (error) {
      next(error);
    }
  };

  // 해시태그로 게시글 리스트 가져오기
  public getPostsWithHashTag = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('해시태그로 게시글 리스트 가져오기');
  };

  // 댓글 리스트 가져오기
  public getComments = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('댓글 리스트 가져오기');
  };

  // 댓글 작성
  public writeComment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('댓글 작성');
  };

  // 댓글 삭제
  public deleteComment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('댓글 삭제');
  };

  // 댓글 수정
  public modifyComment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('댓글 수정');
  };

  // 답글 작성
  public writeReply = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('답글 작성');
  };

  // 답글 삭제
  public deleteReply = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('답글 삭제');
  };

  // 답글 수정
  public modifyReply = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('답글 수정');
  };

  // 좋아요 갯수 가져오기
  public getLikeCnt = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('좋아요 갯수 가져오기');
  };

  // 좋아요
  public setLike = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('좋아요');
  };

  // 좋아요 취소
  public cancelLike = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.send('좋아요 취소');
  };
}

export default new UserController();
