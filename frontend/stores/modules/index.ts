import CommonStore from './CommonStore';
import PostStore from './PostStore';
import UserStore from './UserStore';
import FollowStore from './FollowStore';
import ViewerStore from './ViewerStore';

class RootStore {
  public commonStore: CommonStore;
  public userStore: UserStore;
  public postStore: PostStore;
  public followStore: FollowStore;
  public viewerStore: ViewerStore;

  constructor(initialData = {}) {
    this.commonStore = new CommonStore(initialData.commonStore);
    this.userStore = new UserStore(initialData.userStore);
    this.postStore = new PostStore(initialData.postStore);
    this.followStore = new FollowStore(initialData.followStore);
    this.viewerStore = new ViewerStore(initialData.viewerStore);
  }
}

export default RootStore;
