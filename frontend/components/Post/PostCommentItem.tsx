import classNames from 'classnames/bind';
import Link from 'next/link';
import { IoIosThumbsUp } from 'react-icons/io';
import getCoolDate from '../../utils/getCoolDate';

import styles from './PostCommentItem.scss';

const cx = classNames.bind(styles);

interface IProps {
  reply?: boolean;
  id: string;
  thumbnail: string;
  username: string;
  content: string;
  likeCnt?: string;
  createdAt: string;
  onClickReply: any;
}

const PostCommentItem = (props: IProps) => {
  const {
    reply,
    id,
    thumbnail,
    username,
    content,
    likeCnt,
    createdAt,
    onClickReply,
  } = props;

  return (
    <div className={cx('post-comment-item')}>
      <div>
        <Link href={`/profile/timeline/${id}`}>
          <img
            className={cx('profile', reply && 'profile-reply')}
            src={thumbnail}
          />
        </Link>
      </div>
      <div className={cx('wrap-content')}>
        <div className={cx('content')}>
          <Link href={`/profile/timeline/${id}`}>
            <span className={cx('username')}>{username}</span>
          </Link>
          <span>{content}</span>
          <div className={cx('like-badge', !likeCnt && 'like-badge-hide')}>
            <IoIosThumbsUp />
            <span>{likeCnt}</span>
          </div>
        </div>

        <div className={cx('interaction')}>
          <span className={cx('like')}>좋아요</span>
          <span className={cx('comment')} onClick={onClickReply}>
            답글 달기
          </span>
          <span className={cx('date')}> {getCoolDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCommentItem;
