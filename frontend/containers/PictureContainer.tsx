import { withRouter, WithRouterProps } from 'next/router';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toast } from 'react-toastify';
import Gallery from '../components/Gallery';
import * as PostAPI from '../api/post';
import * as UserAPI from '../api/user';
import { Profile } from '../types';

interface IProps extends WithRouterProps {
  viewerStore?: any;
}

interface IState {
  pictureList: any[];
  profile: Profile;
}

@inject('viewerStore')
@observer
class UserInfoContainer extends Component<IProps, IState> {
  state = {
    pictureList: [],
    profile: {
      username: '',
      id: '-1',
      thumbnail: '',
    }
  }

  componentDidMount = async () => {
    const { 
      router: {
        query: { userId },
      },
    } = this.props;
    try {
      const { data: posts } = await PostAPI.getUserPosts(userId)
      const pictureList = posts.reduce((accum, data) => accum.concat(data.imgs), [])
      const { data: userInfo } = await UserAPI.getUserInfo(userId);
      this.setState({
        pictureList,
        profile: userInfo
      })
    } catch (error) {
      toast.error('친구 정보를 가져오는데 실패했습니다.')
    }
  }

  public render() {
    return <Gallery pictureList={this.state.pictureList} onClickPhoto={this.handleClickPhoto}/>;
  }

  public handleClickPhoto = (currentIndex: number) => {
    const { viewerStore } = this.props;
    const { pictureList, profile } = this.state;
    viewerStore.setViewerData({
      currentIndex,
      images: pictureList,
      username: profile.username
    })
  }
}

export default withRouter(UserInfoContainer);
