import axios from 'axios';

export const googleLogin = ({ email, snsId, username, thumbnail }) => axios.post('/api/auth/login/google', { profile: { email, snsId, username, thumbnail } });
export const kakaoLogin = ({ email, snsId, username, thumbnail }) => axios.post('/api/auth/login/kakao', { profile: { email, snsId, username, thumbnail } });
export const naverLogin = ({ email, snsId, username, thumbnail }) => axios.post('/api/auth/login/naver', { profile: { email, snsId, username, thumbnail } });
export const checkStatus = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');