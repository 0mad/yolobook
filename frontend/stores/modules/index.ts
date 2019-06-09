import AuthStore from './AuthStore';
import CommonStore from './CommonStore';
import UserStore from './UserStore';

class RootStore {
  public commonStore: CommonStore;
  public authStore: AuthStore;
  public userStore: UserStore;

  constructor(initialData = {}) {
    this.commonStore = new CommonStore(initialData.commonStore);
    this.authStore = new AuthStore(initialData.authStore);
    this.userStore = new UserStore(initialData.userStore);
  }
}

export default RootStore;
