import classNames from 'classnames/bind';
import styles from './Comment.scss';
import CommentEditor from './CommentEditor';
import CommentItem from './CommentItem';

const cx = classNames.bind(styles);

interface IProps {
  user: any;
  commentData: any[];
  onClickLike: () => void;
  onClickReply: () => void;
}

const renderReplyList = ({ replyData, onClickLike, onClickReply, user }) => {
  if (!replyData || replyData.length < 1) {
    return false;
  }
  return (
    <div className={cx('reply-area')}>
      <ol className={cx('reply-list')}>
        {replyData.map(comment => (
          <CommentItem
            comment={comment}
            reply={true}
            onClickLike={onClickLike}
            onClickReply={onClickReply}
            key={comment.id}
          />
        ))}
      </ol>
      <CommentEditor user={user} reply={true} />
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
          <CommentItem
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
          </CommentItem>
        );
      })}
    </ol>
  );
};

const Comment = (props: IProps) => {
  const { user } = props;
  return (
    <div className={cx('comment')}>
      {renderCommentList(props)}
      <CommentEditor user={user} />
    </div>
  );
};

export default Comment;
