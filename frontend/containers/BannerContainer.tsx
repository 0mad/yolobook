import React, { Component } from 'react';
import * as FollowAPI from '../api/follow';
import * as UserAPI from '../api/user';
import Banner from '../components/Banner';
import { inject, observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { withRouter, WithRouterProps } from 'next/router';
import ProfileStore from '../stores/modules/ProfileStore';
import UserStore from '../stores/modules/UserStore';

interface IProps extends WithRouterProps {
  userStore: UserStore;
  profileStore: ProfileStore;
}

@inject('userStore', 'profileStore')
@observer
class BannerContainer extends Component<IProps> {
  handleChangeCoverImg = async (event: React.ChangeEvent) => {
    event.preventDefault();
    const { userStore, profileStore } = this.props;
    const {
      userInfo: { id },
    } = profileStore;
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('cover-img', file);
    formData.append('id', id);
    try {
      const res = await UserAPI.modifyCoverImg(formData);
      profileStore.setUserInfo(res.data);
      userStore.setLoggedInfo(res.data);
      toast.success('커버 이미지 변경 성공');
    } catch (error) {
      toast.error('커버 이미지 변경 실패');
      throw error;
    }
  };

  componentDidMount = async () => {
    const {
      router: {
        query: { userId },
      },
      userStore: { loggedInfo },
      profileStore,
    } = this.props;
    const { id: loggedId } = loggedInfo;
    if (!userId || userId == loggedId) {
      profileStore.setUserInfo(loggedInfo);
      return;
    }

    try {
      const res = await UserAPI.getUserInfo(userId);
      profileStore.setUserInfo(res.data);
    } catch (error) {
      profileStore.initUserInfo();
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
      profileStore: {
        userInfo: { id, username, thumbnail, coverImg },
      },
    } = this.props;
    if (!!userId && userId == loggedId) {
      console.log('같음');
    }

    return (
      <Banner
        backgroundImage={coverImg}
        profileImage={thumbnail}
        username={username}
        onClickFollow={() => this.handleFollow(id)}
        onCoverImgsChange={this.handleChangeCoverImg}
      />
    );
  }

  public handleFollow(followingId: number) {
    FollowAPI.follow(followingId);
  }
}

export default withRouter(BannerContainer);
