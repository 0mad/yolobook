import express from 'express';
import { multerUpload } from '../../lib/multer';
import { isLoggedIn } from '../middlewares';
import PostController from './post.controller';

const post = express.Router();

post.post('/img', multerUpload.array('imgs'), PostController.uploadImg);
post.get('/', PostController.getPosts);
post.get('/:userId', PostController.getUserPosts);
post.post('/', isLoggedIn, PostController.wrtiePost);
post.post('/like/:postId', PostController.likePost);
post.delete('/like/:id', PostController.cancelLikePost);
post.get('/hashtag', PostController.getPostsWithHashTag);
post.get('/:id/comments', PostController.getComments);
post.post('/:id/comment', isLoggedIn, PostController.writeComment);
post.delete('/comment/:id', PostController.deleteComment);
post.patch('/comment/:id', PostController.modifyComment);
post.post('/comment/:id/reply', isLoggedIn, PostController.writeReply);
post.post('/comment/like/:commentId', PostController.likeComment);
post.delete('/comment/like/:id', PostController.cancelLikeComment);
post.delete('/reply/:id', PostController.deleteReply);
post.patch('/reply/:id', PostController.modifyReply);
post.post('/reply/like/:replyCommentId', PostController.likeReplyComment);
post.delete('/reply/like/:id', PostController.cancelLikeReplyComment);

export default post;
