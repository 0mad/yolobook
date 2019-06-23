import { action, observable, toJS } from 'mobx';

class FollowStore {
  @observable followerList!: any[];
  @observable followingList!: any[];
  userId!: number;

  constructor(initialData: any) {
    if (initialData) {
      const { followerList, followingList, userId } = initialData;
      this.followerList = followerList;
      this.followingList = followingList;
      this.userId = userId;
    } else {
      this.initialize();
    }
  }

  private initialize() {
    this.followerList = [];
    this.followingList = [];
    this.userId = -1;
  }

  @action
  acceptFollow = (followId: number) => {
    this.followerList = this.followerList.filter(follow => follow.id !== followId);
  };

  rejectFollow = (followId: number) => {
    this.followerList = this.followerList.filter(follow => follow.id !== followId);
  };

  @action
  cancelFollow = (followId: number) => {
    this.followingList = this.followingList.filter(follow => follow.id !== followId);
  };

  @action
  setFollowList = (data: { followingList: any[], followerList: any[] }) => {
    const { followingList, followerList } = data;
    this.followerList = followerList.map(follow => ({
      id: follow.id,
      createdAt: follow.createdAt,
      profile: follow.follower
    }));
    this.followingList = followingList.map(follow => ({
      id: follow.id,
      createdAt: follow.createdAt,
      profile: follow.following
    }));
  }
}

export default FollowStore;
