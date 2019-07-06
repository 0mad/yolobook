import className from 'classnames/bind';
import Link from 'next/link';
import { useState } from 'react';
import style from './Post.scss';
import { IoIosThumbsUp } from 'react-icons/io';
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaRegComments,
  FaRegShareSquare,
} from 'react-icons/fa';
import PostGallery from './PostGallery';
import PostComments from './PostComments';
import PostCommentEditor from './PostCommentEditor';
import getCoolDate from '../../utils/getCoolDate';

import {
  CommentHandler,
  PostHandler,
  Post as PostModel,
  Profile,
} from '../../types';

const cx = className.bind(style);

interface IProps {
  isLogged: boolean;
  user: Profile;
  post: PostModel;
  postHandler: PostHandler;
  commentHandler: CommentHandler;
}

const Post = (props: IProps) => {
  const { isLogged, user, post, postHandler, commentHandler } = props;
  const {
    content,
    createdAt,
    imgs,
    profile,
    comments = [],
    likeCnt,
    isLike,
  } = post;
  const { thumbnail, username, id: userId } = profile;
  const { onClickPhoto, onSubmitComment, onTogglePostLike } = postHandler;

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
          {!!parseInt(likeCnt) && (
            <div className={cx('score-info-item', 'score-info-like')}>
              <IoIosThumbsUp />
              <span>{`${likeCnt}명`}</span>
            </div>
          )}
          <div>
            {false && <div className={cx('score-info-item')}>공유 7회</div>}
            {!!comments.length && (
              <div className={cx('score-info-item')}>
                {`댓글 ${comments.length}개`}
              </div>
            )}
          </div>
        </div>
        {isLogged && (
          <ul className={cx('more-list')}>
            <li
              className={cx('more-item', isLike === 'true' && 'like-did')}
              onClick={() => {
                onTogglePostLike({ post, isLike: !(isLike === 'true') });
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
        )}
      </div>
      {isLogged && (
        <div className={cx('comments', !isShowComment && 'comments-hide')}>
          <PostComments
            user={user}
            comments={comments}
            commentHandler={commentHandler}
          />
          <PostCommentEditor
            user={user}
            parent={post}
            onSubmit={onSubmitComment}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
