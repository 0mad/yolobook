import React, { Component } from 'react';
import * as followAPI from '../api/follow';
import Banner from '../components/Banner';

interface IProps {}

class BannerContainer extends Component<IProps> {
  public render() {
    const backgroundImage = 'http://placekitten.com/1000/1000';
    const profileImage = 'http://placekitten.com/200/200';
    const username = '유주현';
    const id = 3;

    return (
      <Banner
        backgroundImage={backgroundImage}
        profileImage={profileImage}
        username={username}
        onClickFollow={() => this.handleFollow(id)}
      />
    );
  }

  public handleFollow(followingId: number) {
    followAPI.follow(followingId);
  }
}

export default BannerContainer;
