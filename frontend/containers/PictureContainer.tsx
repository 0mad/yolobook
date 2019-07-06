import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import Gallery from '../components/Gallery';
import * as PostAPI from '../api/post';
import { toast } from 'react-toastify';

interface IProps {
  userStore?: any;
  viewerStore?: any;
}

interface IState {
  pictureList: any[];
}

@inject('userStore', 'viewerStore')
@observer
class UserInfoContainer extends Component<IProps, IState> {
  state = {
    pictureList: []
  }

  async componentDidMount() {
    const { userStore: { loggedInfo } } = this.props;
    let pictureList;
    try {
      const { data } = await PostAPI.getUserPosts(loggedInfo.id)
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

export default UserInfoContainer;
