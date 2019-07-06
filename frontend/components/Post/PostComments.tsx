import classNames from 'classnames/bind';
import { useState } from 'react';
import PostCommentItem from './PostCommentItem';
import styles from './PostComments.scss';
import PostReplyComments from './PostReplyComments';
import PostCommentEditor from './PostCommentEditor';
import { IoIosReturnRight } from 'react-icons/io';
import {
  Comment,
  CommentHandler,
  Profile,
} from '../../types';

const cx = classNames.bind(styles);

interface IPostCommentProps {
  user: Profile;
  comment: Comment;
  commentHandler: CommentHandler;
}

interface IPostCommentsProps {
  user: Profile;
  comments: Comment[];
  commentHandler: CommentHandler;
}

const PostComment = (props: IPostCommentProps) => {
  const {
    user,
    comment,
    commentHandler,
  } = props;
  const { replyComments=[] } = comment;
  const {
    onSubmitReplyComment,
    onToggleCommentLike,
    onToggleReplyCommentLike
  } = commentHandler;
  const [isShowEditor, setIsShowEditor] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const handleShowReplyCommentEditor = () => {
    setIsShowEditor(true);
  };
  const handleShowReplyComment = () => {
    setIsShowComments(true);
    setIsShowEditor(true);
  };

  return (
    <>
      <PostCommentItem
        comment={comment}
        onClickReply={handleShowReplyCommentEditor}
        onToggleLike={onToggleCommentLike}
      />
      <div className={cx('reply-comments')}>
        {!!replyComments.length && (
          <>
            {!isShowComments && (
              <div
                className={cx('open-reply-comments')}
                onClick={handleShowReplyComment}
              >
                <IoIosReturnRight />
                <span>{`답글 ${replyComments.length}개 더보기`}</span>
              </div>
            )}
            {isShowComments && (
              <PostReplyComments
                comment={comment}
                onReplyClick={handleShowReplyCommentEditor}
                onToggleLike={onToggleReplyCommentLike}
              />
            )}
          </>
        )}
        {isShowEditor && user && user.id !== '-1' && (
          <div>
            <PostCommentEditor
              parent={comment}
              user={user}
              onSubmit={onSubmitReplyComment}
              reply
            />
          </div>
        )}
      </div>
    </>
  );
};

const PostComments = (props: IPostCommentsProps) => {
  const {
    user,
    comments=[],
    commentHandler,
  } = props;
  return (
    <div className={cx('post-comments')}>
      <ul>
        {comments.map((comment: any) => (
          <li key={comment.id}>
            <PostComment
              user={user}
              comment={comment}
              commentHandler={commentHandler}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComments;
