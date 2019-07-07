import express from 'express';
import { resizeImage } from '../../lib/resizeImage';
import { seperateFilename } from '../../lib/utils';
import { Account } from '../../models/Account';
import { Comment } from '../../models/Comment';
import { LikeComment } from '../../models/LikeComment';
import { LikePost } from '../../models/LikePost';
import { LikeReplyComment } from '../../models/LikeReplyComment';
import { Post } from '../../models/Post';
import { PostImage } from '../../models/PostImage';
import { ReplyComment } from '../../models/ReplyComment';

class PostController {
  // 이미지를 업로드하고 이미지를 얻을 수 있는 주소를 json으로 응답
  public uploadImg = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const data: Array<object> = [];
    const imgs: any = req.files;
    for (const img of imgs) {
      const { path, filename: filenameWithExt } = img;
      const { filename, ext } = seperateFilename(filenameWithExt);
      const filenames = await resizeImage(path, filename, ext, ['md', 'xlg']);
      data.push({ url: `/img/${filenames.md}` });
    }
    res.json(data);
  };

  // 계시글 리스트 가져오기
  public getPosts = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const posts = await Post.getPosts();
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
    const posts = await Post.getPosts({
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

  //  게시물 좋아요
  public likePost = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { postId } = req.params;
    const {
      user: {
        profile: { id: userId },
      },
    } = req.body;
    try {
      const existingReplyComment = await LikePost.findOne({
        where: {
          accountId: parseInt(userId, 10),
          postId: parseInt(postId, 10),
        },
      });

      if (existingReplyComment) {
        res.sendStatus(500);
      } else {
        const newLike = await LikePost.create({
          accountId: parseInt(userId, 10),
          postId: parseInt(postId, 10),
        });
        res.json({
          accountId: newLike.accountId,
          id: newLike.id,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  // 게시글 좋아요 취소
  public cancelLikePost = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = req.params;
    const {
      user: {
        profile: { id: userId },
      },
    } = req.body;
    try {
      const result = await LikePost.destroy({
        where: {
          accountId: userId,
          id,
        },
      });
      res.sendStatus(result === 1 ? 200 : 500);
    } catch (error) {
      next(error);
    }
  };

  //  댓글 좋아요
  public likeComment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { commentId } = req.params;
    const {
      user: {
        profile: { id: userId },
      },
    } = req.body;
    try {
      const existingComment = await LikeComment.findOne({
        where: {
          accountId: parseInt(userId, 10),
          commentId: parseInt(commentId, 10),
        },
      });

      if (existingComment) {
        res.sendStatus(500);
      } else {
        const newLike = await LikeComment.create({
          accountId: parseInt(userId, 10),
          commentId: parseInt(commentId, 10),
        });
        res.json({
          accountId: newLike.accountId,
          id: newLike.id,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  // 댓글 좋아요 취소
  public cancelLikeComment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = req.params;
    const {
      user: {
        profile: { id: userId },
      },
    } = req.body;
    try {
      const result = await LikeComment.destroy({
        where: {
          accountId: userId,
          id,
        },
      });
      res.sendStatus(result === 1 ? 200 : 500);
    } catch (error) {
      next(error);
    }
  };

  //  답글 좋아요
  public likeReplyComment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { replyCommentId } = req.params;
    const {
      user: {
        profile: { id: userId },
      },
    } = req.body;
    try {
      const existingReplyComment = await LikeReplyComment.findOne({
        where: {
          accountId: parseInt(userId, 10),
          replyCommentId: parseInt(replyCommentId, 10),
        },
      });

      if (existingReplyComment) {
        res.sendStatus(500);
      } else {
        const newLike = await LikeReplyComment.create({
          accountId: parseInt(userId, 10),
          replyCommentId: parseInt(replyCommentId, 10),
        });
        res.json({
          accountId: newLike.accountId,
          id: newLike.id,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  // 답글 좋아요 취소
  public cancelLikeReplyComment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = req.params;
    const {
      user: {
        profile: { id: userId },
      },
    } = req.body;
    try {
      const result = await LikeReplyComment.destroy({
        where: {
          accountId: userId,
          id,
        },
      });
      res.sendStatus(result === 1 ? 200 : 500);
    } catch (error) {
      next(error);
    }
  };
}

export default new PostController();
