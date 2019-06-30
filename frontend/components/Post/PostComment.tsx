import classNames from 'classnames/bind';
import PostCommentItem from './PostCommentItem';
import styles from './PostComment.scss';

const cx = classNames.bind(styles);

interface IProps {
  // user: any;
  commentData?: any[];
  onClickLike?: () => void;
  onClickReply?: () => void;
}

const renderReplyList = ({ replyData, onClickLike, onClickReply, user }) => {
  if (!replyData || replyData.length < 1) {
    return false;
  }
  return (
    <div className={cx('reply-area')}>
      <ol className={cx('reply-list')}>
        {replyData.map(comment => (
          <PostCommentItem
            comment={comment}
            reply={true}
            onClickLike={onClickLike}
            onClickReply={onClickReply}
            key={comment.id}
          />
        ))}
      </ol>
      <PostCommentEditor user={user} reply={true} />
    </div>
  );
};
const renderCommentList = ({
  commentData,
  onClickLike,
  onClickReply,
  user,
}) => {
  return (
    <ol className={cx('comment-list')}>
      {commentData.map(comment => {
        return (
          <PostCommentItem
            comment={comment}
            onClickLike={onClickLike}
            onClickReply={onClickReply}
            key={comment.id}
          >
            {renderReplyList({
              onClickLike,
              onClickReply,
              replyData: comment.replys,
              user,
            })}
          </PostCommentItem>
        );
      })}
    </ol>
  );
};

const PostComment = (props: IProps) => {
  // const { user } = props;

  return (
    <div className={cx('post-comment')}>
      {/* <PostCommentEditor /> */}
      {/* {renderCommentList(props)} */}
      {/* <PostCommentEditor user={user} /> */}
    </div>
  );
};

export default PostComment;
