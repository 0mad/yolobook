import classNames from 'classnames/bind';
import { useState } from 'react';
import PostCommentItem from './PostCommentItem';
import styles from './PostComments.scss';
import PostReplyComments from './PostReplyComments';
import PostCommentEditor from './PostCommentEditor';
import { IoIosReturnRight } from 'react-icons/io';

const cx = classNames.bind(styles);

interface IPostCommentProps {
  profile: any;
  comment?: any;
  onCommentLikeToggleClick: Function;
  onReplyCommentSubmit: Function;
  onReplyCommentLikeToggleClick: Function;
}

interface IPostCommentsProps {
  profile: any;
  comments?: any;
  onCommentLikeToggleClick: Function;
  onReplyCommentSubmit: Function;
  onReplyCommentLikeToggleClick: Function;
}

const PostComment = (props: IPostCommentProps) => {
  const {
    profile,
    comment,
    onCommentLikeToggleClick,
    onReplyCommentSubmit,
    onReplyCommentLikeToggleClick,
  } = props;
  const { comments: replyComments } = comment;
  const [isShowEditor, setIsShowEditor] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const handleShowReplyCommentEditorClick = () => {
    setIsShowEditor(true);
  };
  const handleShowReplyCommentClick = () => {
    setIsShowComments(true);
    setIsShowEditor(true);
  };

  return (
    <>
      <PostCommentItem
        comment={comment}
        onReplyClick={handleShowReplyCommentEditorClick}
        onLikeToggleClick={onCommentLikeToggleClick}
      />
      <div className={cx('reply-comments')}>
        {!!replyComments.length && (
          <>
            {!isShowComments && (
              <div
                className={cx('open-reply-comments')}
                onClick={handleShowReplyCommentClick}
              >
                <IoIosReturnRight />
                <span>{`답글 ${replyComments.length}개 더보기`}</span>
              </div>
            )}
            {isShowComments && (
              <PostReplyComments
                comment={comment}
                onReplyClick={handleShowReplyCommentEditorClick}
                onLikeToggleClick={onReplyCommentLikeToggleClick}
              />
            )}
          </>
        )}
        {isShowEditor && (
          <div>
            <PostCommentEditor
              parent={comment}
              profile={profile}
              onSubmit={onReplyCommentSubmit}
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
    profile,
    comments,
    onCommentLikeToggleClick,
    onReplyCommentSubmit,
    onReplyCommentLikeToggleClick,
  } = props;
  return (
    <div className={cx('post-comments')}>
      <ul>
        {comments.map((comment: any) => (
          <li key={comment.id}>
            <PostComment
              profile={profile}
              comment={comment}
              onCommentLikeToggleClick={onCommentLikeToggleClick}
              onReplyCommentSubmit={onReplyCommentSubmit}
              onReplyCommentLikeToggleClick={onReplyCommentLikeToggleClick}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComments;
