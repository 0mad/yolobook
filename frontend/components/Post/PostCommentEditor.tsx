import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PostCommentEditor.scss';
import Link from 'next/link';
const cx = classNames.bind(styles);

interface IProps {
  reply?: boolean;
  parentId: string;
  userId: string;
  thumbnail: string;
  onSubmit: Function;
}

const PostCommentEditor = (props: IProps) => {
  const { reply, parentId, userId, thumbnail, onSubmit } = props;
  const [value, setValue] = useState('');

  return (
    <div className={cx('post-comment-editor')}>
      <Link href={`/profile/timeline/${userId}`}>
        <img
          className={cx('profile', reply && 'profile-reply')}
          src={thumbnail}
        />
      </Link>
      <div className={cx('form')}>
        <textarea
          className={cx('textarea')}
          name="input-content"
          rows={1}
          placeholder={reply ? '댓글 달기' : '댓글을 입력하세요...'}
          onChange={event => setValue(event.target.value)}
        />
        <button
          className={cx('submit')}
          onClick={() => {
            onSubmit({ parentId, value });
          }}
        >
          달기
        </button>
      </div>
    </div>
  );
};

export default PostCommentEditor;
