import { inject, observer } from 'mobx-react';
import Router from 'next/router';
import React, { Component } from 'react';
import Login from '../components/Login';
import storage from '../lib/storage';

interface IState {}

@inject('authStore', 'userStore')
@observer
class LoginContainer extends Component<any, IState> {
  public render() {
    return (
      <Login
        onLoginGoogle={this.handleLoginGoogle}
        onLoginKakao={this.handleLoginKakao}
        onLoginNaver={this.handleLoginNaver}
      />
    );
  }

  public handleLoginGoogle = async ({ profileObj }) => {
    const { authStore, userStore } = this.props;
    try {
      await authStore.googleLogin(profileObj);
      const { results } = authStore;
      userStore.setLoggedInfo(results);
      Router.push({ pathname: '/' });
      storage.set('loggedInfo', results);
    } catch (error) {
      console.error('로그인 실패');
    }
  };
  public handleLoginKakao(res) {
    console.dir(res);
  }
  public handleLoginNaver({}) {}
}

export default LoginContainer;
