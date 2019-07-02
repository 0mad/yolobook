import axios from 'axios';

export const uploadImgs = (formData: any) =>
  axios.post('/api/post/img', formData);

export const getPosts = () => axios.get('/api/post');
export const getUserPosts = (userId: number) => axios.get(`/api/post/${userId}`);

export const writePost = (content, imgUrls) =>
  axios.post('/api/post', { content, imgUrls });
