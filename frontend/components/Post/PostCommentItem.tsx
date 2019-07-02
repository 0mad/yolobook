import classNames from 'classnames/bind';
import Link from 'next/link';
import { IoIosThumbsUp } from 'react-icons/io';
import getCoolDate from '../../utils/getCoolDate';

import styles from './PostCommentItem.scss';

const cx = classNames.bind(styles);

interface IProps {
  reply?: boolean;
  comment: {
    id: string;
    profile: {
      id: string;
      username: string;
      thumbnail: string;
    };
    content: string;
    isLike: string;
    likeCnt?: any;
    createdAt: string;
  };
  onReplyClick: any;
  onLikeToggleClick: any;
}

const PostCommentItem = (props: IProps) => {
  const { reply, comment, onReplyClick, onLikeToggleClick } = props;
  const {
    profile: { id: userId, username, thumbnail },
    content,
    isLike,
    likeCnt,
    createdAt,
  } = comment;

  return (
    <div className={cx('post-comment-item')}>
      <div>
        <Link href={`/profile/timeline/${userId}`}>
          <img
            className={cx('profile', reply && 'profile-reply')}
            src={thumbnail}
          />
        </Link>
      </div>
      <div className={cx('wrap-content')}>
        <div className={cx('content')}>
          <Link href={`/profile/timeline/${userId}`}>
            <span className={cx('username')}>{username}</span>
          </Link>
          <span>{content}</span>
          <div
            className={cx(
              'like-badge',
              !Number.parseInt(likeCnt) && 'like-badge-hide'
            )}
          >
            <IoIosThumbsUp />
            <span>{likeCnt}</span>
          </div>
        </div>

        <div className={cx('interaction')}>
          <span
            className={cx('like', isLike === 'true' && 'like-did')}
            onClick={() =>
              onLikeToggleClick({ comment, isLike: !(isLike === 'true') })
            }
          >
            좋아요
          </span>
          <span className={cx('comment')} onClick={onReplyClick}>
            답글 달기
          </span>
          <span className={cx('date')}> {getCoolDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCommentItem;
