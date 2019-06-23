import axios from 'axios';

export const getUserInfo = (id: string) => axios.get(`/api/user/${id}`);
export const modifyUserInfo = ({ profile, username }) =>
  axios.patch(`/api/user`, { profile, username });
export const getUserSearchList = (search: any) =>
  axios.get(`/api/user/search/${search}`);
export const modifyCoverImg = (formData: any) =>
  axios.patch(`/api/user/cover`, formData);
export const modifyThumbnailImg = (formData: any) =>
  axios.patch(`/api/user/thumbnail`, formData);
