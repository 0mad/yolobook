import React, { Component } from 'react';
import FriendList from '../components/Friend';

class FriendContainer extends Component{
  public render() {
    const friendList = [];
    for (let i = 0; i < 30; i++) {
      friendList.push({
        img: 'http://placekitten.com/1000/1000',
        name: '문태민',
        cnt: '1000',
      });
    }

    return <FriendList friendList={friendList} />;
  }
}

export default FriendContainer;
