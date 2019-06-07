import React, { Component } from 'react';
import Banner from '../components/Banner';

class BannerContainer extends Component<any> {
  public render() {
    const backgroundImage = 'http://placekitten.com/1000/1000';
    const profileImage = 'http://placekitten.com/200/200';
    const username = '유주현';

    return (
      <Banner
        backgroundImage={backgroundImage}
        profileImage={profileImage}
        username={username}
      />
    );
  }
}

export default BannerContainer;
