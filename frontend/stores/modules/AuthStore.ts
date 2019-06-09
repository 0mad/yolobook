import { action, observable, runInAction } from 'mobx';
import * as AuthAPI from '../../api/auth';

class AuthStore {
  @observable public results: any;

  constructor(initialData = {}) {
    const { results } = initialData;
    this.results = !!results ? results : {};
  }

  @action
  public googleLogin = async (data: { email: string, googleId: string, imageUrl: string, name: string }) => {
    const { email, googleId, imageUrl, name } = data;
    try {
      const res = await AuthAPI.googleLogin({
        email,
        snsId: googleId,
        thumbnail: imageUrl,
        username: name,
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