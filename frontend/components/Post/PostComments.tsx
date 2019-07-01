import classNames from 'classnames/bind';
import { useState } from 'react';
import PostCommentItem from './PostCommentItem';
import styles from './PostComments.scss';
import PostReplyComments from './PostReplyComments';

const cx = classNames.bind(styles);

interface IProps {
  user: any;
  comments?: any;
  onCommentSubmit: any;
  onReplyCommentSubmit: any;
}

const PostComment = (props: IProps) => {
  const { user, comments, onReplyCommentSubmit } = props;
  const [isShowEditor, setIsShowEditor] = useState(false);
  const handleReplyCommentClick = () => {
    setIsShowEditor(true);
  };
  return (
    <div className={cx('post-comments')}>
      <ul>
        {comments.map(
          ({
            id: commentId,
            thumbnail,
            username,
            content,
            likeCnt,
            createdAt,
            comments,
          }: any) => (
            <li key={commentId}>
              <PostCommentItem
                id={commentId}
                thumbnail={thumbnail}
                username={username}
                content={content}
                createdAt={createdAt}
                likeCnt={likeCnt}
                onClickReply={handleReplyCommentClick}
              />
              <PostReplyComments
                commentId={commentId}
                replyComments={comments}
                user={user}
                onSubmit={onReplyCommentSubmit}
                isShowEditor={isShowEditor}
                onClickReply={handleReplyCommentClick}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default PostComment;
