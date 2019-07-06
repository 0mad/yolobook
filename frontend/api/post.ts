import axios from 'axios';

export const uploadImgs = (formData: any) =>
  axios.post('/api/post/img', formData);

export const getPosts = () => axios.get('/api/post');
export const getUserPosts = (userId: number) =>
  axios.get(`/api/post/${userId}`);
export const writePost = (content: string, imgUrls: string) =>
  axios.post('/api/post', { content, imgUrls });
export const writeComment = (id: string, content: string) =>
  axios.post(`/api/post/${id}/comment`, { content });
export const writeReplyComment = (id: string, content: string) =>
  axios.post(`/api/post/comment/${id}/reply`, { content });

export const modifyComment = ({ id, content }) =>
  axios.patch(`/api/post/comment/${id}`, { content });
export const deleteComment = ({ id, content }) =>
  axios.delete(`/api/post/comment/${id}`, { content });
export const modifyReplyComment = ({ id, content }) =>
  axios.patch(`/api/post/reply/${id}`, { content });
export const deleteReplyComment = ({ id, content }) =>
  axios.delete(`/api/post/reply/${id}`, { content });
