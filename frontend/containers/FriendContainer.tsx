import React, { Component } from 'react';
import { withRouter, WithRouterProps } from 'next/router';
import { inject, observer } from 'mobx-react';
import FriendList from '../components/Friend';
import * as FollowAPI from '../api/follow';

interface IProps extends WithRouterProps {
  followStore?: any;
  userStore?: any;
}

interface IState {
  friendList: any[];
}

@inject('followStore', 'userStore')
@observer
class FriendContainer extends Component<IProps, IState> {
  state = {
    friendList: [],
  };

  componentDidMount = async () => {
    const {
      router: {
        query: { userId },
      },
      userStore: { loggedInfo },
    } = this.props;
    let friendList = [];
    if (parseInt(userId, 10) !== loggedInfo.id) {
      try {
        const { data } = await FollowAPI.getAcceptedFollowList(userId);
        friendList = data;
      } catch (error) {
        console.error(error);
      }
      this.setState({
        friendList,
      });
    }
  };

  public render() {
    const {
      router: {
        query: { userId },
      },
      userStore: { loggedInfo },
      followStore,
    } = this.props;
    let friendList = [];
    if (parseInt(userId, 10) === loggedInfo.id) {
      friendList = followStore.friendList;
    } else {
      friendList = this.state.friendList;
    }
    return <FriendList friendList={friendList} />;
  }
}

export default withRouter(FriendContainer);
