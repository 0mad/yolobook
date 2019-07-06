import React, { Component } from 'react';
import FriendList from '../components/Friend';
import { inject, observer } from 'mobx-react';

interface IProps {}

interface IState {}

@inject('followStore')
@observer
class FriendContainer extends Component<IProps, IState> {
  state = {
    friendList: []
  }

  public render() {
    const { followStore } = this.props;
    const { friendList } = followStore;
    return <FriendList friendList={friendList} />;
  }
}

export default FriendContainer;
