import axios from 'axios';

export const googleLogin = ({ email, snsId, username, thumbnail }) => axios.post('/api/auth/login/google', { email, snsId, username, thumbnail });
export const checkStatus = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');