import classNames from 'classnames/bind';
import Link from 'next/link';
import { IoIosThumbsUp } from 'react-icons/io';
import styles from './CommentItem.scss';

const cx = classNames.bind(styles);

interface IProps {
  comment: any;
  reply?: boolean;
  onClickLike: () => void;
  onClickReply: () => void;
  children?: any;
}

const CommentItem = (props: IProps) => {
  const { comment, reply, onClickLike, onClickReply, children } = props;
  return (
    <li className={cx('comment-item-wrapper', { reply })}>
      <div className={cx('comment-item')}>
        <img className={cx('author-profile')} src={comment.author.profile} />
        <div className={cx('content-area')}>
          <div className={cx('balloon')}>
            <span className={cx('author-name')}>
              <Link href="/">{comment.author.fullName}</Link>
            </span>
            <span className={cx('content')}>{comment.content}</span>
            <div className={cx('like-badge')}>
              <div className={cx('like-icon')}>
                <IoIosThumbsUp />
              </div>
              <span className={cx('like-score')}>{comment.like}</span>
            </div>
          </div>
          <div className={cx('interaction')}>
            <span className={cx('button-like')} onClick={onClickLike}>
              좋아요
            </span>
            <span className={cx('button-reply')} onClick={onClickReply}>
              답글 달기
            </span>
            <span className={cx('created')}>2일</span>
          </div>
        </div>
      </div>
      {children}
    </li>
  );
};

export default CommentItem;
