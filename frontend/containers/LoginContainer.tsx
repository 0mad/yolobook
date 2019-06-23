import { inject, observer } from 'mobx-react';
import Router from 'next/router';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import * as AuthAPI from '../api/auth';
import Login from '../components/Login';

interface IProps {
  userStore?: any;
}

@inject('userStore')
@observer
class LoginContainer extends Component<IProps> {
  public render() {
    const { userStore } = this.props;
    const { logged } = userStore;
    if (logged) {
      Router.push('/');
    }
    return (
      <Login
        onLoginGoogle={this.handleLoginGoogle}
        onLoginKakao={this.handleLoginKakao}
        onLoginNaver={this.handleLoginNaver}
      />
    );
  }

  public handleLoginGoogle = async ({ profileObj }) => {
    const { userStore } = this.props;
    const userProfile = {
      email: profileObj.email,
      snsId: profileObj.googleId,
      thumbnail: profileObj.imageUrl,
      username: profileObj.name,
    };

    try {
      const { data } = await AuthAPI.googleLogin(userProfile);
      userStore.setLoggedInfo(data);
      Router.push({ pathname: '/' });
      toast.success('로그인 성공');
    } catch (error) {
      toast.error('로그인 실패');
    }
  };

  public handleLoginKakao = async ({ profile }) => {
    const { properties } = profile;
    const { userStore } = this.props;
    const userProfile = {
      email: null,
      snsId: profile.id.toString(),
      thumbnail: properties.thumbnail_image,
      username: properties.nickname,
    };
    try {
      const { data } = await AuthAPI.kakaoLogin(userProfile);
      userStore.setLoggedInfo(data);
      Router.push({ pathname: '/' });
      toast.success('로그인 성공');
    } catch (error) {
      console.error('로그인 실패');
    }
  };
  public handleLoginNaver = async (profile: object) => {
    const { userStore } = this.props;
    const userProfile = {
      email: profile.email,
      snsId: profile.id,
      thumbnail: profile.profile_image,
      username: profile.name,
    };
    try {
      const { data } = await AuthAPI.naverLogin(userProfile);
      userStore.setLoggedInfo(data);
      Router.push({ pathname: '/' });
      toast.success('로그인 성공');
    } catch (error) {
      console.error('로그인 실패');
    }
  };
}

export default LoginContainer;
