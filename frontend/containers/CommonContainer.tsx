import { inject, observer } from 'mobx-react';
import React from 'react';
import storage from '../lib/storage';

interface IProps {
  children: any;
}

@inject('userStore')
@observer
class CommonContainer extends React.Component<IProps, IState> {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    const { userStore } = this.props;
    userStore.setLoggedInfo(loggedInfo);
    try {
      await userStore.checkStatus();
    } catch (error) {
      storage.remove('loggedInfo');
      window.location.href = '/auth/login?expired';
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
