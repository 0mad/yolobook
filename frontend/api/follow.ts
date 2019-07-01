import axios from 'axios';

export const follow = (userId) => axios.post(`/api/follow/${userId}`);
export const acceptFollow = (followId) => axios.patch(`/api/follow/${followId}/accept`);
export const rejectFollow = (followId) => axios.patch(`/api/follow/${followId}/reject`);
export const cancelFollow = (followId) => axios.delete(`/api/follow/${followId}`);
export const getFollowList = () => axios.get(`/api/follow`);
export const getAcceptedFollowList = (userId) => axios.get(`/api/follow/${userId}/accept`);