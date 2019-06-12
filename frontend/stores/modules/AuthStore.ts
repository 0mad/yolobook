import { action, observable, runInAction } from 'mobx';
import * as AuthAPI from '../../api/auth';

const loginAPI = {
  google: AuthAPI.googleLogin,
  kakao: AuthAPI.kakaoLogin,
  naver: AuthAPI.naverLogin,
};

class AuthStore {
  @observable public results: any;

  constructor(initialData = {}) {
    const { results } = initialData;
    this.results = !!results ? results : {};
  }

  @action
  public login = async (
    data: { email: string, snsId: string, thumbnail: string, username: string },
    provider: 'kakao' | 'google' | 'naver'
  ) => {
    const { email, snsId, thumbnail, username } = data;
    try {
      const res = await loginAPI[provider]({
        email,
        snsId,
        thumbnail,
        username,
      });
      runInAction(() => {
        this.results = res.data;
      });
    } catch (error) {
      throw error;
    }
  }

  @action
  public logout = async () => await AuthAPI.logout();
}

export default AuthStore;