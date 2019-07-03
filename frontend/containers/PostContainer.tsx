import { withRouter, WithRouterProps } from 'next/router';
import React, { Component } from 'react';
import PostWrapper from '../components/PostWrapper';
import { observer, inject } from 'mobx-react';
import * as PostAPI from '../api/post';
import { CommentHandler, PostHandler, Post, Comment } from '../types';
import { toast } from 'react-toastify';

interface IProps extends WithRouterProps {
  userStore?: any;
  postStore?: any;
  viewerStore?: any;
}
interface IState {}

@inject('userStore', 'postStore', 'viewerStore')
@observer
class PostContainer extends Component<IProps, IState> {
  async componentDidMount() {
    const {
      router: {
        query: { userId },
      },
      postStore,
    } = this.props;
    const getPost = userId
      ? () => PostAPI.getUserPosts(userId)
      : PostAPI.getPosts;
    try {
      const { data } = await getPost();
      postStore.setPosts(data);
    } catch (error) {
      return false;
    }
  }

  public render() {
    const {
      postStore: { posts },
      userStore: { logged, loggedInfo },
    } = this.props;
    return !!posts && !!posts.length ? (
      <PostWrapper
        isLogged={logged}
        user={loggedInfo}
        posts={posts}
        postHandler={this.postHandler}
        commentHandler={this.commentHandler}
      />
    ) : (
      false
    );
  }

  private handleClickPhoto = (data: {
    currentIndex: number;
    images: any[];
    username: string;
  }) => {
    const { viewerStore } = this.props;
    viewerStore.setViewerData(data);
  };

  private handleTogglePostLike = () => {
    console.log('toggle post like');
  };

  private handleSubmitComment = async (commentData: {
    parent: Post;
    value: string;
  }) => {
    const { parent: post, value: content } = commentData;
    const { userStore: loggedInfo } = this.props;
    try {
      const { data } = await PostAPI.writeComment(post.id, content);
      const comment = {
        ...data,
        profile: loggedInfo,
      };
      post.comments.push(comment);
      this.forceUpdate();
    } catch (error) {
      toast.error('댓글 달기 실패');
    }
  };

  private handleToggleCommentLike = () => {
    console.log('toggle comment like');
  };

  private handleSubmitReplyComment = async (replyCommentData: {
    parent: Comment;
    value: string;
  }) => {
    const { parent: comment, value: content } = replyCommentData;
    const { userStore: loggedInfo } = this.props;
    try {
      const { data } = await PostAPI.writeReplyComment(comment.id, content);
      // const replyComment = {
      //   ...data,
      //   profile: loggedInfo,
      // };
      // comment.replyComments.push(replyComment);
      // this.forceUpdate();
    } catch (error) {
      toast.error('답글 달기 실패');
    }
  };

  private handleToggleReplyCommentLike = () => {
    console.log('toggle reply like');
  };

  private postHandler: PostHandler = {
    onClickPhoto: this.handleClickPhoto,
    onSubmitComment: this.handleSubmitComment,
    onTogglePostLike: this.handleTogglePostLike,
  };

  private commentHandler: CommentHandler = {
    onToggleCommentLike: this.handleToggleCommentLike,
    onSubmitReplyComment: this.handleSubmitReplyComment,
    onToggleReplyCommentLike: this.handleSubmitReplyComment,
  };
}

export default withRouter(PostContainer);
