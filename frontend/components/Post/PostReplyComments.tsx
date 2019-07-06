import PostCommentItem from './PostCommentItem';
import { Comment } from '../../types';

interface IProps {
  comment: Comment;
  onToggleLike: Function;
  onReplyClick: Function;
}

const PostReplyComments = (props: IProps) => {
  const { comment, onToggleLike, onReplyClick } = props;
  const { replyComments=[] } = comment;

  return (
    <ul>
      {replyComments.map((replyComment: any) => (
        <li key={replyComment.id}>
          <PostCommentItem
            comment={replyComment}
            onClickReply={() => onReplyClick()}
            onToggleLike={onToggleLike}
            reply
          />
        </li>
      ))}
    </ul>
  );
};

export default PostReplyComments;
