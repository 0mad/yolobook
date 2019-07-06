import axios from 'axios';

export const getUserInfo = (id: string) => axios.get(`/api/user/${id}`);
export const modifyUserInfo = ({ profile, username, description }) =>
  axios.patch(`/api/user`, { profile, username, description });
export const getUserSearchList = (search: any) =>
  axios.get(`/api/user/search/${search}`);
export const getUserPictureList = (userId: number) =>
  axios.get(`/api/user/pictures/${userId}`);
export const modifyCoverImg = (formData: any) =>
  axios.patch(`/api/user/cover`, formData);
export const modifyThumbnailImg = (formData: any) =>
  axios.patch(`/api/user/thumbnail`, formData);
