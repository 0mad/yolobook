import CommonStore from './CommonStore';
import PostStore from './PostStore';
import UserStore from './UserStore';

class RootStore {
  public commonStore: CommonStore;
  public userStore: UserStore;
  public postStore: PostStore;

  constructor(initialData = {}) {
    this.commonStore = new CommonStore(initialData.commonStore);
    this.userStore = new UserStore(initialData.userStore);
    this.postStore = new PostStore(initialData.postStore);
  }
}

export default RootStore;
