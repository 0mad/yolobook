import { inject, observer } from 'mobx-react';
import React from 'react';
import * as AuthAPI from '../api/auth';
import storage from '../lib/storage';

interface IProps {
  children: any;
}

@inject( 'userStore')
@observer
class CommonContainer extends React.Component<IProps> {
  initializeUserInfo = async () => {
    const { userStore } = this.props;
    const { logged, validated } = userStore;
    if(logged && validated) {
      return;
    }

    try {
      const { data } = await AuthAPI.checkStatus();
      userStore.setLoggedInfo(data);
      storage.set('loggedInfo', data);
    } catch (error) {
      userStore.logout();
      storage.remove('loggedInfo');
    }
  };

  componentDidMount() {
    this.initializeUserInfo();
  }

  public render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

export default CommonContainer;
