import React, { Component } from 'react';
import Login from '../components/Login';

interface IState {}

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

  public handleLoginGoogle() {}
  public handleLoginKakao() {}
  public handleLoginNaver() {}
}

export default LoginContainer;
