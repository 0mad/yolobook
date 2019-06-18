import { action, observable, toJS } from 'mobx';

class FollowStore {
  @observable follows!: any[];
  userId!: number;

  constructor(initialData) {
    if (initialData) {
      const { follows, userId } = initialData;
      this.follows = follows;
      this.userId = userId;
    } else {
      this.initialize();
    }
  }

  private initialize() {
    this.follows = [];
    this.userId = -1;
  }

  @action
  updateFollow = (followId: number, status) => {
    const follow = this.follows.find(follow => follow.id === followId);
    follow.status = status;
  };

  @action
  removeFollow = (followId: number) => {
    this.follows = this.follows.filter(follow => follow.id !== followId);
  };

  @action
  setFollowList = (followList) => {
    this.follows = followList;
  }

  setUserId = (userId) => {
    this.userId = userId;
  }

  public get followerList() {
    return toJS(this.follows
      .filter(follow => follow.following.id === this.userId && follow.status === 'REQUESTING')
      .map(follow => ({
        id: follow.id,
        createdAt: follow.createdAt,
        profile: follow.follower
      })));
  }

  public get followingList() {
    return toJS(this.follows
      .filter(follow => follow.follower.id === this.userId && follow.status === 'REQUESTING')
      .map(follow => ({
        id: follow.id,
        createdAt: follow.createdAt,
        profile: follow.follower
      })));
  }
}

export default FollowStore;
