import PostCommentItem from './PostCommentItem';

interface IProps {
  comment?: any;
  onLikeToggleClick: Function;
  onReplyClick: Function;
}

const PostReplyComments = (props: IProps) => {
  const { comment, onLikeToggleClick, onReplyClick } = props;
  const { comments: replyComments } = comment;

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
