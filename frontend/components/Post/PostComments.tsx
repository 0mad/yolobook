import classNames from 'classnames/bind';
import { useState } from 'react';
import PostCommentItem from './PostCommentItem';
import styles from './PostComments.scss';
import PostReplyComments from './PostReplyComments';

const cx = classNames.bind(styles);

interface IPostCommentProps {
  user: any;
  comment?: any;
  onReplyCommentSubmit: any;
}

interface IPostCommentsProps {
  user: any;
  comments?: any;
  onReplyCommentSubmit: any;
}

const PostComment = (props: IPostCommentProps) => {
  const {
    user,
    comment: {
      id: commentId,
      thumbnail,
      username,
      content,
      likeCnt,
      createdAt,
      comments,
    },
    onReplyCommentSubmit,
  } = props;

  const [isShowEditor, setIsShowEditor] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const handleReplyCommentClick = () => {
    setIsShowEditor(true);
  };
  const handleShowReplyCommentClick = () => {
    setIsShowComments(true);
  };

  return (
    <>
      <PostCommentItem
        id={commentId}
        thumbnail={thumbnail}
        username={username}
        content={content}
        createdAt={createdAt}
        likeCnt={likeCnt}
        onClickReply={handleReplyCommentClick}
      />
      {/* <div className={cx('open-reply-comments')}>

      </div> */}
      <PostReplyComments
        commentId={commentId}
        replyComments={comments}
        user={user}
        onSubmit={onReplyCommentSubmit}
        isShowEditor={isShowEditor}
        onClickReply={handleReplyCommentClick}
      />
    </>
  );
};

const PostComments = (props: IPostCommentsProps) => {
  const { user, comments, onReplyCommentSubmit } = props;
  return (
    <div className={cx('post-comments')}>
      <ul>
        {comments.map((comment: any) => (
          <li key={comment.id}>
            <PostComment
              user={user}
              comment={comment}
              onReplyCommentSubmit={onReplyCommentSubmit}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComments;
