import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TimeLine from '../components/Timeline';
import EditorContainer from './EditorContainer';
import PostContainer from './PostContainer';
import { withRouter } from 'next/router';
import UserStore from '../stores/modules/UserStore';
import ViewerContainer from '../containers/ViewerContainer';

interface IProps {
  children: any;
  router: any;
  userStore: UserStore;
  isTopSpace: boolean;
}

@inject('userStore')
@observer
class TimelineContainer extends Component<IProps> {
  public render() {
    const {
      router: {
        query: { userId },
      },
      userStore: { loggedInfo, logged },
      isTopSpace,
    } = this.props;

    let isMyProfile = false;
    if (!userId || userId == loggedInfo.id) {
      isMyProfile = true;
    }
    const editor = !!logged && isMyProfile ? <EditorContainer /> : false;
    return (
      <TimeLine isTopSpace={!!logged && isTopSpace}>
        {editor}
        <PostContainer />
        <ViewerContainer />
      </TimeLine>
    );
  }
}

export default withRouter(TimelineContainer);
