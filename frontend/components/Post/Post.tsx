import className from 'classnames/bind';
import { IoIosChatboxes, IoIosShareAlt, IoIosThumbsUp } from 'react-icons/io';
import Link from 'next/link';
import style from './Post.scss';
import PostGallery from './PostGallery';
import getCoolDate from '../../utils/getCoolDate';

const cx = className.bind(style);

interface IProps {
  post: any;
  onClickPhoto: any;
}

const Post = (props: IProps) => {
  const {
    post: {
      content,
      createdAt,
      imgs,
      user: { thumbnail, username, id }
    },
    onClickPhoto
  } = props;
  
  return (
    <div className={cx('post')}>
      <div className={cx('post-header')}>
        <Link href={`/profile/timeline/${id}`}>
          <img className={cx('user-photo')} src={thumbnail} />
        </Link>
        <div className={cx('meta-data')}>
          <Link href={`/profile/timeline/${id}`}>
            <p className={cx('user-name')}>{username}</p>
          </Link>
          <span className={cx('created-time')}>{getCoolDate(createdAt)}</span>
        </div>
      </div>
      <div className={cx('post-body')}>
        <pre className={cx('post-content')}>{content}</pre>
        <PostGallery images={imgs} onClickPhoto={onClickPhoto} username={username}/>
      </div>

      <div className={cx('post-footer')}>
        <div className={cx('score-board')}>
          <span className={cx('score-like')}>
            <IoIosThumbsUp />
            78명
          </span>
          <span className={cx('score-share')}>공유 7회</span>
          <span className={cx('score-comment')}>댓글 81개</span>
        </div>
        <ul className={cx('interaction')}>
          <li className={cx('button-like')}>
            <IoIosThumbsUp />
            좋아요
          </li>
          <li className={cx('button-comment')}>
            <IoIosChatboxes />
            댓글
          </li>
          <li className={cx('button-share')}>
            <IoIosShareAlt />
            공유하기
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Post;
