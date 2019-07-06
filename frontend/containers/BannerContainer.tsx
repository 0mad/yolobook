import React, { Component } from 'react';
import * as FollowAPI from '../api/follow';
import * as UserAPI from '../api/user';
import Banner from '../components/Banner';
import { inject, observer } from 'mobx-react';
import { toast } from 'react-toastify';
import Router, { withRouter, WithRouterProps } from 'next/router';
import UserStore from '../stores/modules/UserStore';
import FollowStore from '../stores/modules/FollowStore';

interface IProps extends WithRouterProps {
  userStore?: UserStore;
  followStore?: FollowStore;
}

interface IState {
  userInfo: any;
}

@inject('userStore', 'followStore')
@observer
class BannerContainer extends Component<IProps, IState> {
  static initialState = {
    userInfo: {
      id: -1,
      username: '',
      thumbnail: null,
      coverImg: ''
    }
  }
  state = BannerContainer.initialState;

  componentDidMount = async () => {
    const {
      router: {
        query: { userId },
      },
      userStore: { loggedInfo },
      followStore,
    } = this.props;

    const { id: loggedId } = loggedInfo;
    if (!userId || parseInt(userId, 10) === loggedId) {
      this.setState({
        userInfo: loggedInfo
      });
    } else {
      try {
        const { data } = await UserAPI.getUserInfo(userId);

        this.setState({
          userInfo: data
        })
      } catch (error) {
        Router.push('/');
        this.setState(BannerContainer.initialState);
      }
    }
    const { notInit } = followStore;
    if (notInit) {
      const { data } = await FollowAPI.getFollowList();
      followStore.setFollowList(data);
    }
  };

  public render() {
    const {
      router: {
        query: { userId },
      },
      userStore: {
        loggedInfo: { id: loggedId },
      },
      followStore,
    } = this.props;

    const { userInfo: { id, username, thumbnail, coverImg }} = this.state;
    let isMyProfile = false;
    if (!userId || userId == loggedId) {
      isMyProfile = true;
    }
    const friendShip = followStore!.getFriendShip(id);

    return (
      <Banner
        backgroundImage={coverImg}
        profileImage={thumbnail}
        username={username}
        isMyProfile={isMyProfile}
        onClickFollow={this.handleFollow}
        onClickAcceptFollow={this.handleAcceptFollow}
        onClickRejectFollow={this.handleRejectFollow}
        onClickCancelFollow={this.handleCancelFollow}
        onCoverImgsChange={this.handleChangeCoverImg}
        onThumbnailImgsChange={this.handleChangeThumbnailImg}
        userId={id}
        friendShip={friendShip}
      />
    );
  }

  handleChangeCoverImg = async (event: React.ChangeEvent) => {
    event.preventDefault();
    const { userStore } = this.props;
    const { userInfo: { id }} = this.state;
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('cover-img', file);
    formData.append('id', id.toString());
    try {
      const res = await UserAPI.modifyCoverImg(formData);
      userStore!.setLoggedInfo(res.data);
      toast.success('커버 이미지 변경 성공');
    } catch (error) {
      toast.error('커버 이미지 변경 실패');
      throw error;
    }
  };

  handleChangeThumbnailImg = async (event: React.ChangeEvent) => {
    event.preventDefault();
    const { userStore } = this.props;
    const { userInfo } = this.state;
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('thumbnail-img', file);
    formData.append('id', userInfo.id.toString());
    try {
      const { data } = await UserAPI.modifyThumbnailImg(formData);
      userStore!.setLoggedInfo(data);
      this.setState({
        userInfo: data
      });
      toast.success('썸네일 이미지 변경 성공');
    } catch (error) {
      toast.error('썸네일 이미지 변경 실패');
      throw error;
    }
  };

  handleFollow = async () => {
    const {
      router: {
        query: { userId }
      },
      followStore,
    } = this.props;
    try {
      const { data } = await FollowAPI.follow(userId);
      followStore!.addFollowing(data);
      toast.success('친구 요청');
    } catch (error) {
      toast.error('친구 요청 실패');
    }
  }

  handleAcceptFollow = async () => {
    const followId = this.getFollowId();
    const { followStore } = this.props;
    try {
      await FollowAPI.acceptFollow(followId);
      followStore!.acceptFollow(followId);
      toast.success('친구 수락');
    } catch (error) {
      toast.error('친구 수락 실패');
    }
  }

  handleRejectFollow = async () => {
    const followId = this.getFollowId();
    const { followStore } = this.props;
    try {
      await FollowAPI.rejectFollow(followId);
      followStore!.rejectFollow(followId);
      toast.success('친구 거절');
    } catch (error) {
      toast.error('친구 거절 실패');
    }
  }

  handleCancelFollow = async () => {
    const followId = this.getFollowId();
    const { followStore } = this.props;
    try {
      await FollowAPI.cancelFollow(followId);
      followStore!.cancelFollow(followId);
      toast.success('친구 요청 삭제');
    } catch (error) {
      toast.error('친구 요청 삭제 실패');
    }
  }

  private getFollowId = () :number => {
    const {
      router: {
        query: { userId },
      },
      followStore,
    } = this.props;
    const { followerList } = followStore;
    const follow = followerList.find(follow => follow.profile.id === parseInt(userId, 10));
    return follow.id
  }
}

export default withRouter(BannerContainer);