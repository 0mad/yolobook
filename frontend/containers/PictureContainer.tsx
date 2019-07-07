import { withRouter, WithRouterProps } from 'next/router';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toast } from 'react-toastify';
import Gallery from '../components/Gallery';
import * as PostAPI from '../api/post';

interface IProps extends WithRouterProps {
  userStore?: any;
  viewerStore?: any;
}

interface IState {
  pictureList: any[];
}

@inject('viewerStore')
@observer
class UserInfoContainer extends Component<IProps, IState> {
  state = {
    pictureList: []
  }

  componentDidMount = async () => {
    const { 
      router: {
        query: { userId },
      },
    } = this.props;
    let pictureList;
    try {
      const { data } = await PostAPI.getUserPosts(userId)
      pictureList = data.reduce((accum, data) => accum.concat(data.imgs), [])
    } catch (error) {
      toast.error('친구 리스트를 가져오는데 실패했습니다.')
    }
    this.setState({
      pictureList
    })
  }

  public render() {
    return <Gallery pictureList={this.state.pictureList} onClickPhoto={this.handleClickPhoto}/>;
  }

  public handleClickPhoto = (currentIndex: number) => {
    const { viewerStore, userStore: { loggedInfo } } = this.props;
    viewerStore.setViewerData({
      currentIndex,
      images: this.state.pictureList,
      username: loggedInfo.username
    })
  }
}

export default withRouter(UserInfoContainer);
