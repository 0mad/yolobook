import express from 'express';
import { multerUpload } from '../../lib/multer';
import { isLoggedIn } from '../middlewares';
import PostController from './post.controller';

const post = express.Router();

post.post('/img', multerUpload.array('imgs'), PostController.uploadImg);
post.get('/', PostController.getPosts);
post.get('/:id', PostController.getPost);
post.post('/', isLoggedIn, PostController.wrtiePost);
post.get('/hashtag', PostController.getPostsWithHashTag);
post.get('/:id/comments', PostController.getComments);
post.post('/:id/comment', PostController.writeComment);
post.delete('/:id/comment/:id', PostController.deleteComment);
post.patch('/:id/comment/:id', PostController.modifyComment);
post.post('/comment/:id/reply', PostController.writeReply);
post.delete('/comment/:id/reply/:id', PostController.deleteReply);
post.patch('/comment/:id/reply/:id', PostController.modifyReply);
post.get('/comment/:id/like', PostController.getLikeCnt);
post.post('/comment/:id/like', PostController.setLike);
post.delete('/comment/:id/like/:id', PostController.cancelLike);

export default post;
