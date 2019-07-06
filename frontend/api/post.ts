import axios from 'axios';

export const uploadImgs = (formData: any) =>
  axios.post('/api/post/img', formData);

export const getPosts = () => axios.get('/api/post');
export const getUserPosts = (userId: number) =>
  axios.get(`/api/post/${userId}`);
export const writePost = (content: string, imgUrls: string) =>
  axios.post('/api/post', { content, imgUrls });
export const likePost = (postId: string) =>
  axios.post(`/api/post/like/${postId}`);
export const cancelLikePost = (likeId: string) =>
  axios.delete(`/api/post/like/${likeId}`);

export const writeComment = (id: string, content: string) =>
  axios.post(`/api/post/${id}/comment`, { content });
export const modifyComment = ({ id, content }) =>
  axios.patch(`/api/post/comment/${id}`, { content });
export const deleteComment = ({ id, content }) =>
  axios.delete(`/api/post/comment/${id}`, { content });
export const likeComment = (commentId: string) =>
  axios.post(`/api/post/comment/like/${commentId}`);
export const cancelLikeComment = (likeId: string) =>
  axios.delete(`/api/post/comment/like/${likeId}`);

export const writeReplyComment = (id: string, content: string) =>
  axios.post(`/api/post/comment/${id}/reply`, { content });
export const modifyReplyComment = ({ id, content }) =>
  axios.patch(`/api/post/reply/${id}`, { content });
export const deleteReplyComment = ({ id, content }) =>
  axios.delete(`/api/post/reply/${id}`, { content });
export const likeReplyComment = (replyId: string) =>
  axios.post(`/api/post/reply/like/${replyId}`);
export const cancelLikeReplyComment = (likeId: string) =>
  axios.delete(`/api/post/reply/like/${likeId}`);