import { RouterProps, withRouter } from 'next/router';
import React, { Component } from 'react';
import * as followAPI from '../api/follow';
import Follow from '../components/Follow';
import { inject, observer } from 'mobx-react';

interface IProps extends RouterProps<any> {}

@inject('followStore')
@observer
class FollowContainer extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.handleFollowAccept = this.handleFollowAccept.bind(this);
    this.handleRejectFollow = this.handleRejectFollow.bind(this);
    this.handleCancelFollow = this.handleCancelFollow.bind(this);
  }

  async componentDidMount() {
    const { followStore } = this.props;
    const { data: { followList, id} } = await followAPI.getFollowList();
    followStore.setUserId(id);
    followStore.setFollowList(followList);
  }

  public render() {
    const { followStore, router } = this.props;
    const { asPath } = router;
    const { followingList, followerList } = followStore;
    const type = asPath.split('/').pop();
    const followList = type === 'follower' ? followerList : followingList;
    return (
      <Follow 
        followList={followList} 
        type={type} 
        onAccept={this.handleFollowAccept}
        onReject={this.handleRejectFollow}
        onCancel={this.handleCancelFollow}
      />
    );
  }

  async handleFollowAccept(followId) {
    try {
      const { status } = await followAPI.acceptFollow(followId);
      if (status === 200) {
        const { followStore } = this.props;
        followStore.updateFollow(followId, 'ACCEPTED');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async handleRejectFollow(followId) {
    try {
      const { status } = await followAPI.rejectFollow(followId);
      if (status === 200) {
        const { followStore } = this.props;
        followStore.updateFollow(followId, 'REJECTED');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async handleCancelFollow(followId) {
    try {
      const { status } = await followAPI.cancelFollow(followId);
      if (status === 200) {
        const { followStore } = this.props;
        followStore.removeFollow(followId);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default withRouter(FollowContainer);
