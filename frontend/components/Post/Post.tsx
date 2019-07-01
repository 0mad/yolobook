import { useState } from 'react';
import className from 'classnames/bind';
import Link from 'next/link';
import style from './Post.scss';
import PostGallery from './PostGallery';
import getCoolDate from '../../utils/getCoolDate';
import PostComments from './PostComments';
import PostCommentEditor from './PostCommentEditor';
import PostCommentItem from './PostCommentItem';
import { IoIosThumbsUp } from 'react-icons/io';
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaComments,
  FaRegComments,
  FaShareSquare,
  FaRegShareSquare,
} from 'react-icons/fa';

const cx = className.bind(style);

interface IProps {
  post: any;
  onClickPhoto: Function;
  onCommentSubmit: Function;
  onReplyCommentSubmit: Function;
}

const Post = (props: IProps) => {
  const {
    post: {
      id: postId,
      content,
      createdAt,
      imgs,
      user: { thumbnail, username, id: userId },
      comments,
    },
    onClickPhoto,
    onCommentSubmit,
    onReplyCommentSubmit,
  } = props;
  const [isShowComment, setIsShowComment] = useState(!!comments.length);

  return (
    <div className={cx('post')}>
      <div className={cx('header')}>
        <Link href={`/profile/timeline/${userId}`}>
          <img className={cx('user-photo')} src={thumbnail} />
        </Link>
        <div className={cx('meta-data')}>
          <Link href={`/profile/timeline/${userId}`}>
            <p className={cx('user-name')}>{username}</p>
          </Link>
          <span className={cx('created-time')}>{getCoolDate(createdAt)}</span>
        </div>
      </div>
      <div className={cx('body')}>
        <div className={cx('post-content')}>{content}</div>
        <PostGallery
          images={imgs}
          onClickPhoto={onClickPhoto}
          username={username}
        />
      </div>

      <div className={cx('footer')}>
        <div className={cx('score-info')}>
          <div className={cx('score-info-item', 'score-info-like')}>
            <IoIosThumbsUp />
            <span>78명</span>
          </div>
          <div>
            <div className={cx('score-info-item')}>공유 7회</div>
            <div className={cx('score-info-item', 'score-info-comment')}>
              댓글 81개
            </div>
          </div>
        </div>
        <ul className={cx('more-list')}>
          <li className={cx('more-item')}>
            <FaRegThumbsUp />
            <span>좋아요</span>
          </li>
          <li
            className={cx('more-item')}
            onClick={() => setIsShowComment(true)}
          >
            <FaRegComments />
            <span>댓글</span>
          </li>
          <li className={cx('more-item')}>
            <FaRegShareSquare />
            <span>공유하기</span>
          </li>
        </ul>
      </div>
      <div className={cx('comments', !isShowComment && 'comments-hide')}>
        <PostCommentEditor
          parentId={postId}
          userId={userId}
          thumbnail={thumbnail}
          onSubmit={onCommentSubmit}
        />
        {/* PostComments */}
      </div>
    </div>
  );
};

export default Post;
