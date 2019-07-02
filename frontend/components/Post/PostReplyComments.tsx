import classNames from 'classnames/bind';
import styles from './PostReplyComments.scss';
import PostCommentItem from './PostCommentItem';
import PostCommentEditor from './PostCommentEditor';

const cx = classNames.bind(styles);

interface IProps {
  commentId: any;
  replyComments?: any;
  user?: any;
  onSubmit: Function;
  isShowEditor: boolean;
  onClickReply: Function;
}

const PostReplyComments = (props: IProps) => {
  const {
    commentId,
    replyComments,
    user: { id: userId, thumbnail },
    onSubmit,
    isShowEditor,
    onClickReply,
  } = props;

  return (
    <div className={cx('post-reply-comments')}>
      <ul>
        {replyComments.map(
          ({
            id: replyCommentId,
            thumbnail,
            username,
            content,
            createdAt,
            likeCnt,
          }: any) => (
            <li key={replyCommentId}>
              <PostCommentItem
                id={replyCommentId}
                thumbnail={thumbnail}
                username={username}
                content={content}
                createdAt={createdAt}
                onClickReply={() => onClickReply()}
                likeCnt={likeCnt}
                reply
              />
            </li>
          )
        )}
      </ul>
      {isShowEditor && (
        <div>
          <PostCommentEditor
            parentId={commentId}
            userId={userId}
            thumbnail={thumbnail}
            onSubmit={onSubmit}
            reply
          />
        </div>
      )}
    </div>
  );
};

export default PostReplyComments;
