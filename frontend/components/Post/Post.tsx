import className from 'classnames/bind';
import { IoIosChatboxes, IoIosShareAlt, IoIosThumbsUp } from 'react-icons/io';
import style from './Post.scss';
import Gallery from './PostGallery';

const cx = className.bind(style);

interface IProps {
  post: any;
}

const Post = (props: IProps) => {
  const {
    post: {
      content,
      imgs,
      user: { thumbnail, username },
    },
  } = props;
  return (
    <div className={cx('post')}>
      <div className={cx('post-header')}>
        <img className={cx('user-photo')} src={thumbnail} />
        <div className={cx('meta-data')}>
          <a className={cx('user-name')}>{username}</a>
          <span className={cx('created-time')}>10시간</span>
        </div>
      </div>
      <div className={cx('post-body')}>
        <pre className={cx('post-content')}>{content}</pre>
        <Gallery photoList={imgs} />
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
