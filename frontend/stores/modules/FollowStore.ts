import { action, observable, computed } from 'mobx';

class FollowStore {
  @observable isInit!: boolean;
  @observable followers!: object;
  @observable followings!: object;
  @observable acceptedList!: object;

  constructor(initialData: any) {
    if (initialData) {
      const { isInit, followers, followings, acceptedList } = initialData;
      this.isInit = isInit;
      this.followers = followers;
      this.followings = followings;
      this.acceptedList = acceptedList;
    } else {
      this.initialize();
    }
  }

  private initialize() {
    this.isInit = false;
    this.followers = {};
    this.followings = {};
    this.acceptedList = {};
  }

  @action
  acceptFollow = (followId: number) => {
    const acceptedFollow = this.followers[followId];
    this.acceptedList = {
      ...this.acceptedList,
      [acceptedFollow.profile.id]: acceptedFollow.profile
    }
    delete this.followers[followId];
  };

  @action
  rejectFollow = (followId: number) => {
    this.followers[followId].status = 'REJECTED';
  };

  @action
  cancelFollow = (followId: number) => {
    delete this.followings[followId];
  };

  @action
  addFollowing = (follow: any) => {
    this.followings = {
      ...this.followings,
      [follow.id]: follow
    };
  }

  @action
  setFollowList = (data: { followingList: any[], followerList: any[], acceptedList: any[] }) => {
    const { acceptedList, followingList, followerList } = data;
    this.followers = followerList.reduce((accum, follow) => {
      accum[follow.id] = {
        id: follow.id,
        status: follow.status,
        createdAt: follow.createdAt,
        profile: follow.follower
      }
      return accum;
    }, {});
    this.followings = followingList.reduce((accum, follow) => {
      accum[follow.id] = {
        id: follow.id,
        status: follow.status,
        createdAt: follow.createdAt,
        profile: follow.following
      }
      return accum;
    }, {});
    this.acceptedList = {
      ...acceptedList.reduce((accum, item) => ({
        ...accum,
        [item.profile.id]: item.profile
      }), {})
    }
    this.isInit = true;
  }

  @computed
  get followingList() {
    return Object.keys(this.followings)
      .map(key => this.followings[key])
  }

  @computed
  get followerList() {
    return Object.keys(this.followers)
      .map(key => this.followers[key])
  }

  @computed
  get friendList() {
    return Object.keys(this.acceptedList)
      .map(key => this.acceptedList[key]);
  }

  get notInit() {
    return !this.isInit;
  }

  getFriendShip = (userId: number): 'NOTHING' | 'FOLLOWING' | 'FOLLOWER' | 'ACCEPTED' | 'REJECTED' => {
    if (userId.toString() in this.acceptedList) {
      return 'ACCEPTED';
    }
    const follower = this.followerList.find(follow => follow.profile.id === userId);
    if (follower) {
      return follower.status === 'REJECTED' ? 'REJECTED' : 'FOLLOWER';
    }
    if (this.followingList.find(follow => follow.profile.id === userId)) {
      return 'FOLLOWING';
    }
    return 'NOTHING'
  }
}

export default FollowStore;
