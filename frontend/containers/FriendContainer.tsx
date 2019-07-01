import React, { Component } from 'react';
import FriendList from '../components/Friend';
import * as followAPI from '../api/follow';
import { toast } from 'react-toastify';

interface IProps {}

interface IState {
  friendList: any[];
}

class FriendContainer extends Component<IProps, IState>{
  state = {
    friendList: []
  }

  async componentDidMount() {
    try {
      const { data } = await followAPI.getAcceptedFollowList(1);
      if(data) {
        this.setState({
          friendList: data
        });
      }
    } catch (error) {
      toast.error('친구 리스트를 가져오는데 실패했습니다.')
    }
  }

  public render() {
    const { friendList } = this.state;
    return <FriendList friendList={friendList} />;
  }
}

export default FriendContainer;
