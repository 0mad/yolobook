import { action, observable } from 'mobx';
import * as AuthAPI from '../../api/auth';

class UserStore {
  @observable public loggedInfo: object; // 현재 로그인중인 유저의 정보 
  @observable public logged: boolean; // 현재 로그인중인지 알려준다
  @observable public validated: boolean; // 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미

  constructor(initialData = {}) {
    const { loggedInfo, logged, validated } = initialData;
    this.loggedInfo = !!loggedInfo ? loggedInfo : this.initLoggedInfo();
    this.logged = !!logged ? logged : false;
    this.validated = !!validated ? validated : false;
  }

  @action
  public setLoggedInfo = (loggedInfo: any) => {
    this.loggedInfo = loggedInfo;
    this.logged = true;
  }

  @action
  public setValidated = (validated: boolean) => {
    this.validated = validated;
  }

  @action
  public checkStatus = async () => {
    try {
      const res = await AuthAPI.checkStatus();
      this.loggedInfo = res;
      this.validated = true;
    } catch (error) {
      this.loggedInfo = this.initLoggedInfo();
      this.validated = false;
      this.logged = false;
    }
  }

  @action
  public logout = async () => await AuthAPI.logout();

  private initLoggedInfo = () => ({
    id: null,
    thumbnail: null,
    username: null
  });
}

export default UserStore;