import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PostCommentEditor.scss';
import Link from 'next/link';
import { Comment, Profile, Post } from '../../types';
const cx = classNames.bind(styles);

interface IProps {
  reply?: boolean;
  parent: Comment | Post;
  user: Profile;
  onSubmit: Function;
}

const PostCommentEditor = (props: IProps) => {
  const { reply = false, parent, user, onSubmit } = props;
  const { id: userId, thumbnail } = user;
  const [value, setValue] = useState('');

  return (
    <div className={cx('post-comment-editor')}>
      <Link href={`/profile/timeline/${userId}`}>
        <a>
          <img
            className={cx('profile', reply && 'profile-reply')}
            src={thumbnail}
          />
        </a>
      </Link>
      <div className={cx('form')}>
        <textarea
          className={cx('textarea')}
          name="input-content"
          rows={1}
          value={value}
          placeholder={reply ? '댓글 달기' : '댓글을 입력하세요...'}
          onChange={event => setValue(event.target.value)}
        />
        <button
          className={cx('submit')}
          onClick={() => {
            onSubmit({ parent, value });
            setValue('');
          }}
        >
          게시
        </button>
      </div>
    </div>
  );
};

export default PostCommentEditor;
