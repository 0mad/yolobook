import { action, observable } from 'mobx';
import * as AuthAPI from '../../api/auth';
import storage from '../../lib/storage';

class UserStore {
  @observable public loggedInfo: any; // 현재 로그인중인 유저의 정보
  @observable public logged: boolean; // 현재 로그인중인지 알려준다
  @observable public validated: boolean; // 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미

  constructor(initialData: any) {
    if (initialData) {
      const { loggedInfo, logged, validated } = initialData;
      this.loggedInfo = loggedInfo;
      this.logged = logged;
      this.validated = validated;
    } else {
      this.setDefaultData();
    }
  }

  private setDefaultData = () => {
    this.loggedInfo = {
      id: -1,
      thumbnail: 'http://placekitten.com/40/40',
      username: '손님',
      coverImg: null,
    };
    this.validated = false;
    this.logged = false;
  };

  @action
  public setLoggedInfo = (loggedInfo: any) => {
    this.loggedInfo = loggedInfo;
    this.logged = true;
    this.validated = true;
    storage.set('loggedInfo', loggedInfo);
  };

  @action
  public setValidated = (validated: boolean) => {
    this.validated = validated;
  };

  @action
  public logout = async () => {
    const { status } = await AuthAPI.logout();
    if (status === 204) {
      this.setDefaultData();
      storage.remove('loggedInfo');
    }
  };
}

export default UserStore;
