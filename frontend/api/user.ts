import axios from 'axios';

export const follow = (target) => axios.post(`/api/user/follow/${target}`);