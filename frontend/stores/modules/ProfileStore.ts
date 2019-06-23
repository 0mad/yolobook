import { observable } from 'mobx';

interface UserInfo {
  id: string | null;
  username: string | null;
  thumbnail: string | null;
  coverImg: string | null;
}

class ProfileStore {
  @observable public userInfo: UserInfo | {};

  constructor(initialData = {}) {
    const { userInfo } = initialData;
    this.userInfo = !!userInfo ? userInfo : {};
  }

  initUserInfo = () => {
    this.userInfo = {};
  };

  setUserInfo = (userInfo: UserInfo) => {
    this.userInfo = userInfo;
  };
}

export default ProfileStore;
