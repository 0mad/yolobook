import { inject, observer } from 'mobx-react';
import React from 'react';
import * as AuthAPI from '../api/auth';
import storage from '../lib/storage';
import Router from 'next/router';

interface IProps {
  userStore?: any;
}

//@TODO 공식적으로 컴포넌트가 렌더링되기 전에 호출되는 함수가 있다면 수정
@inject('userStore')
@observer
class BeforeMountComponent extends React.Component<IProps> {
  initializeUserInfo = async () => {
    const { userStore } = this.props;
    const oldLoggedInfo = storage.get('loggedInfo');
    if (oldLoggedInfo) {
      // 사용자 정보에 대해 검증(HTTP)을 하는 시간이 렌더링하는 시간 보다 느리므로
      // 우선 localStorage에 있는 사용자 정보를 상태에 설정한 후 다시 설정
      userStore.setLoggedInfo(oldLoggedInfo);
      await this.checkUserInfo();
      return;
    }

    const { logged, validated } = userStore;
    if (logged && validated) {
      return;
    }
    this.checkUserInfo();
  };

  private checkUserInfo = async () => {
    const { userStore } = this.props;
    try {
      const { data } = await AuthAPI.checkStatus();
      userStore.setLoggedInfo(data);
    } catch (error) {
      userStore.logout();
      Router.push({ pathname: '/' });
    }
  };

  componentDidMount() {
    this.initializeUserInfo();
  }

  public render() {
    return false;
  }
}

export default BeforeMountComponent;
