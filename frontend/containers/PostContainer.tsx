import React, { Component } from 'react';
import PostWrapper from '../components/PostWrapper';
import { observer, inject } from 'mobx-react';
import * as PostAPI from '../api/post';

interface IProps {
  postStore?: any;
}
interface IState {
  user: any;
  posts: any[];
}

@inject('postStore')
@observer
class PostContainer extends Component<IProps, IState> {

  async componentDidMount() {
    const { postStore } = this.props;
    try {
      const res = await PostAPI.getPosts();
      postStore.setPosts(res.data);
    } catch (error) {
      return false;
    }
  }

  public render() {
    const {
      postStore: { posts },
    } = this.props;
    return !!posts && !!posts.length ? <PostWrapper posts={posts} /> : false;
  }
}

export default PostContainer;
