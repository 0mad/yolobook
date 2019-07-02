import { useState } from 'react';
import className from 'classnames/bind';
import Link from 'next/link';
import style from './Post.scss';
import PostGallery from './PostGallery';
import getCoolDate from '../../utils/getCoolDate';
import PostComments from './PostComments';
import PostCommentEditor from './PostCommentEditor';
import { IoIosThumbsUp } from 'react-icons/io';
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaRegComments,
  FaRegShareSquare,
} from 'react-icons/fa';

const cx = className.bind(style);

interface IProps {
  post: any;
  onClickPhoto: Function;
  onLikeToggleClick: Function;
  onCommentSubmit: Function;
  onCommentLikeToggleClick: Function;
  onReplyCommentSubmit: Function;
  onReplyCommentLikeToggleClick: Function;
}

const Post = (props: IProps) => {
  const {
    post,
    onClickPhoto,
    onLikeToggleClick,
    onCommentSubmit,
    onCommentLikeToggleClick,
    onReplyCommentSubmit,
    onReplyCommentLikeToggleClick,
  } = props;
  const { content, createdAt, imgs, profile, comments, likeCnt, isLike } = post;
  const { thumbnail, username, id: userId } = profile;

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
          {!!Number.parseInt(likeCnt) && (
            <div className={cx('score-info-item', 'score-info-like')}>
              <IoIosThumbsUp />
              <span>{`${likeCnt}명`}</span>
            </div>
          )}
          <div>
            {false && <div className={cx('score-info-item')}>공유 7회</div>}
            {!!comments.length && (
              <div className={cx('score-info-item', 'score-info-comment')}>
                {`댓글 ${comments.length}개`}
              </div>
            )}
          </div>
        </div>
        <ul className={cx('more-list')}>
          <li
            className={cx('more-item', isLike === 'true' && 'like-did')}
            onClick={() => {
              onLikeToggleClick({ post, isLike: !(isLike === 'true') });
            }}
          >
            {isLike ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <span>좋아요</span>
          </li>
          <li
            className={cx('more-item')}
            onClick={() => setIsShowComment(true)}
          >
            <FaRegComments />
            <span>댓글</span>
          </li>
          {false && (
            <li className={cx('more-item')}>
              <FaRegShareSquare />
              <span>공유하기</span>
            </li>
          )}
        </ul>
      </div>
      <div className={cx('comments', !isShowComment && 'comments-hide')}>
        <PostComments
          profile={profile}
          comments={comments}
          onCommentLikeToggleClick={onCommentLikeToggleClick}
          onReplyCommentSubmit={onReplyCommentSubmit}
          onReplyCommentLikeToggleClick={onReplyCommentLikeToggleClick}
        />
        <PostCommentEditor
          parent={post}
          profile={profile}
          onSubmit={onCommentSubmit}
        />
      </div>
    </div>
  );
};

export default Post;
