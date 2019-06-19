import axios from 'axios';

export const follow = (targetId) => axios.post(`/api/follow/${targetId}`);
export const acceptFollow = (followId) => axios.patch(`/api/follow/${followId}/accept`);
export const rejectFollow = (followId) => axios.patch(`/api/follow/${followId}/reject`);
export const cancelFollow = (followId) => axios.delete(`/api/follow/${followId}`);
export const getFollowerList = () => axios.get(`/api/follow/follower`);
export const getFollowingList = () => axios.get(`/api/follow/following`);
export const getFollowList = () => axios.get(`/api/follow`);