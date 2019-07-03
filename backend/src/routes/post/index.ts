import express from 'express';
import { multerUpload } from '../../lib/multer';
import { isLoggedIn } from '../middlewares';
import PostController from './post.controller';

const post = express.Router();

post.post('/img', multerUpload.array('imgs'), PostController.uploadImg);
post.get('/', PostController.getPosts);
post.get('/:userId', PostController.getUserPosts);
post.post('/', isLoggedIn, PostController.wrtiePost);
post.get('/hashtag', PostController.getPostsWithHashTag);
post.get('/:id/comments', PostController.getComments);
post.post('/:id/comment', isLoggedIn, PostController.writeComment);
post.delete('/comment/:id', PostController.deleteComment);
post.patch('/comment/:id', PostController.modifyComment);
post.post('/comment/:id/reply', isLoggedIn, PostController.writeReply);
post.delete('/reply/:id', PostController.deleteReply);
post.patch('/reply/:id', PostController.modifyReply);
post.get('/comment/:id/like', PostController.getLikeCnt);
post.post('/comment/:id/like', PostController.setLike);
post.delete('/comment/:id/like', PostController.cancelLike);

export default post;
