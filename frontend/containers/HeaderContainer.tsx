import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import Header from '../components/common/Header';

interface IState {}

@inject('userStore')
@observer
class HeaderContainer extends Component<any, IState> {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  public render() {
    const { userStore } = this.props;
    const { logged, loggedInfo } = userStore;

    return (
      <Header
        isLogined={logged}
        profile={loggedInfo}
        onLogout={this.handleLogout}
      />
    );
  }

  async handleLogout() {
    const { userStore } = this.props;
    try {
      await userStore.logout();
    } catch(error){
      throw error;
    }
  }
}

export default HeaderContainer;
