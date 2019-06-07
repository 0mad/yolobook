import React, { Component } from 'react';
import UserInfo from '../components/UserInfo';

class UserInfoContainer extends Component<any> {
  public render() {
    const data = {
      introduction: `나는 해적왕이 될 사람이다.
      나는 해적왕이 될꺼라구`,
      isEdit: false,
    };

    return <UserInfo {...data} />;
  }
}

export default UserInfoContainer;
