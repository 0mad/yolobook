import axios from 'axios';

export const getUserInfo = (id) => axios.get(`/api/user/${id}`);
export const modifyUserInfo = ({ profile, username }) => axios.patch(`/api/user`, { profile, username });
export const getUserSearchList = (search) => axios.get(`api/user/search/${search}`);