import PostCommentItem from './PostCommentItem';
import { Comment } from '../../types';

interface IProps {
  comment: Comment;
  onLikeToggleClick: Function;
  onReplyClick: Function;
}

const PostReplyComments = (props: IProps) => {
  const { comment, onLikeToggleClick, onReplyClick } = props;
  const { replyComments=[] } = comment;

  return (
    <ul>
      {replyComments.map((replyComment: any) => (
        <li key={replyComment.id}>
          <PostCommentItem
            comment={replyComment}
            onReplyClick={() => onReplyClick()}
            onLikeToggleClick={onLikeToggleClick}
            reply
          />
        </li>
      ))}
    </ul>
  );
};

export default PostReplyComments;
