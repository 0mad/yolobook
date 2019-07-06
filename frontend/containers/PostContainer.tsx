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

  private handleTogglePostLike = async (args: { post: Post, isLike: boolean}) => {
    const { post, isLike } = args;
    if(isLike) {
      try {
        const { data } = await PostAPI.likePost(post.id);
        post.likes.push(data);
        this.forceUpdate();
      } catch (error) {
        console.error('좋아요 실패')
      }
    } else {
      const { userStore: { loggedInfo }} = this.props;
      const userLike = post.likes.find(like => like.accountId === loggedInfo.id);
      try {
        const { status } = await PostAPI.cancelLikePost(userLike.id);
        if(status === 200) {
          post.likes = post.likes.filter(like => like.id !== userLike.id);
          this.forceUpdate();
        }
      } catch (error) {
        console.error('좋아요 취소 실패')
      }
    }
  };

  private handleSubmitComment = async (args: {
    parent: Post;
    value: string;
  }) => {
    const { parent: post, value: content } = args;
    const {
      userStore: { loggedInfo },
    } = this.props;
    try {
      const { data } = await PostAPI.writeComment(post.id, content);
      const comment = {
        ...data,
        profile: loggedInfo,
      };
      if (!post.comments) {
        post.comments = [];
      }
      post.comments.push(comment);
      this.forceUpdate();
    } catch (error) {
      toast.error('댓글 달기 실패');
    }
  };

  private handleToggleCommentLike = async (args: { comment: Comment, isLike: boolean}) => {
    const { comment, isLike } = args;
    if(isLike) {
      try {
        const { data } = await PostAPI.likeComment(comment.id);
        comment.likes.push(data);
        this.forceUpdate();
      } catch (error) {
        console.error('좋아요 실패')
      }
    } 
    else {
      const { userStore: { loggedInfo }} = this.props;
      const userLike = comment.likes.find(like => like.accountId === loggedInfo.id);
      try {
        const { status } = await PostAPI.cancelLikeComment(userLike.id);
        if(status === 200) {
          comment.likes = comment.likes.filter(like => like.id !== userLike.id);
          this.forceUpdate();
        }
      } catch (error) {
        console.error('좋아요 취소 실패')
      }
    }
  };

  private handleSubmitReplyComment = async (replyCommentData: {
    parent: Comment;
    value: string;
  }) => {
    const { parent: comment, value: content } = replyCommentData;
    const {
      userStore: { loggedInfo },
    } = this.props;
    try {
      const { data } = await PostAPI.writeReplyComment(comment.id, content);
      const replyComment = {
        ...data,
        profile: loggedInfo,
      };
      if (!comment.replyComments) {
        comment.replyComments = [];
      }
      comment.replyComments.push(replyComment);
      this.forceUpdate();
    } catch (error) {
      toast.error('답글 달기 실패');
    }
  };

  private handleToggleReplyCommentLike = async (args: { comment: Comment, isLike: boolean}) => {
    const { comment: replyComment, isLike } = args;
    if(isLike) {
      try {
        const { data } = await PostAPI.likeReplyComment(replyComment.id);
        replyComment.likes.push(data);
        this.forceUpdate();
      } catch (error) {
        console.error('좋아요 실패')
      }
    } else {
      const { userStore: { loggedInfo }} = this.props;
      const userLike = replyComment.likes.find(like => like.accountId === loggedInfo.id);
      try {
        const { status } = await PostAPI.cancelLikeReplyComment(userLike.id);
        if(status === 200) {
          replyComment.likes = replyComment.likes.filter(like => like.id !== userLike.id);
          this.forceUpdate();
        }
      } catch (error) {
        console.error('좋아요 취소 실패')
      }
    }
  };

  private postHandler: PostHandler = {
    onClickPhoto: this.handleClickPhoto,
    onSubmitComment: this.handleSubmitComment,
    onTogglePostLike: this.handleTogglePostLike,
  };

  private commentHandler: CommentHandler = {
    onToggleCommentLike: this.handleToggleCommentLike,
    onSubmitReplyComment: this.handleSubmitReplyComment,
    onToggleReplyCommentLike: this.handleToggleReplyCommentLike,
  };
}

export default withRouter(PostContainer);
