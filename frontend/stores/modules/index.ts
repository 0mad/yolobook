import AuthStore from './AuthStore';
import CommonStore from './CommonStore';
import PostStore from './PostStore';
import UserStore from './UserStore';

class RootStore {
  public commonStore: CommonStore;
  public authStore: AuthStore;
  public userStore: UserStore;
  public postStore: PostStore;

  constructor(initialData = {}) {
    this.commonStore = new CommonStore(initialData.commonStore);
    this.authStore = new AuthStore(initialData.authStore);
    this.userStore = new UserStore(initialData.userStore);
    this.postStore = new PostStore(initialData.postStore);
  }
}

export default RootStore;
