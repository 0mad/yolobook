import express from 'express';
import { Account } from '../../models/Account';
import { Comment } from '../../models/Comment';
import { Post } from '../../models/Post';
import { PostImage } from '../../models/PostImage';
import { ReplyComment } from '../../models/ReplyComment';

class UserController {
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
      include: [
        Account,
        PostImage,
        {
          association: 'comments',
          attributes: ['id', 'createdAt', 'content'],
          include: [
            {
              association: 'profile',
              attributes: ['id', 'username', 'thumbnail'],
            },
            {
              association: 'replyComments',
              attributes: ['id', 'createdAt', 'content'],
              include: [
                {
                  association: 'profile',
                  attributes: ['id', 'username', 'thumbnail'],
                },
              ],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    const data: any = [];
    posts.forEach((post: any) => {
      data.push(post.info);
    });
    res.json(data);
  };

  // 특정 사용자 아이디의 게시글 리스트 가져오기
  public getUserPosts = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { userId } = req.params;
    const posts = await Post.findAll({
      include: [Account, PostImage],
      order: [['createdAt', 'DESC']],
      where: {
        accountId: userId,
      },
    });
    const data: any = [];
    posts.forEach((post: any) => {
      data.push(post.info);
    });
    res.json(data);
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
        accountId: id,
        content,
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
    const { id: postId } = req.params;
    const {
      content,
      user: {
        profile: { id },
      },
    } = req.body;
    try {
      const comment = await Comment.create({
        accountId: parseInt(id, 10),
        content,
        postId: parseInt(postId, 10),
      });
      res.json({
        content: comment.content,
        createdAt: comment.createdAt,
        id: comment.id,
      });
    } catch (error) {
      next(error);
    }
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
    const { id: commentId } = req.params;
    const {
      content,
      user: {
        profile: { id: userId },
      },
    } = req.body;
    try {
      const replyComment = await ReplyComment.create({
        accountId: parseInt(userId, 10),
        commentId: parseInt(commentId, 10),
        content,
      });
      res.json({
        content: replyComment.content,
        createdAt: replyComment.createdAt,
        id: replyComment.id,
      });
    } catch (error) {
      next(error);
    }
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
