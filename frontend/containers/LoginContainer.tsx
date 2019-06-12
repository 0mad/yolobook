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
    const userProfile = {
      email: profileObj.email,
      snsId: profileObj.googleId,
      thumbnail: profileObj.imageUrl,
      username: profileObj.name
    };

    try {
      await authStore.login(userProfile, 'google');
      const { results } = authStore;
      userStore.setLoggedInfo(results);
      Router.push({ pathname: '/' });
      storage.set('loggedInfo', results);
    } catch (error) {
      console.error('로그인 실패');
    }
  };

  public handleLoginKakao = async ({ profile }) => {
    const { properties } = profile;
    const { authStore, userStore } = this.props;
    const userProfile = {
      email: null,
      snsId: profile.id.toString(),
      thumbnail: properties.thumbnail_image,
      username: properties.nickname,
    };
    try {
      await authStore.login(userProfile, 'kakao');
      const { results } = authStore;
      userStore.setLoggedInfo(results);
      Router.push({ pathname: '/' });
      storage.set('loggedInfo', results);
    } catch (error) {
      console.error('로그인 실패');
    }
  }
  public handleLoginNaver = async (profile) => {
    const { authStore, userStore } = this.props;
    const userProfile = {
      email: profile.email,
      snsId: profile.id,
      thumbnail: profile.profile_image,
      username: profile.name,
    };
    try {
      await authStore.login(userProfile, 'naver');
      const { results } = authStore;
      userStore.setLoggedInfo(results);
      Router.push({ pathname: '/' });
      storage.set('loggedInfo', results);
    } catch (error) {
      console.error('로그인 실패');
    }
  }
}

export default LoginContainer;
