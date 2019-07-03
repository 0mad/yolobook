import classNames from 'classnames/bind';
import Post from '../Post';
import styles from './PostWrapper.scss';
import {
  CommentHandler,
  PostHandler,
  Post as PostModel,
  Profile,
} from '../../types';

const cx = classNames.bind(styles);

interface IProps {
  isLogged: boolean;
  user: Profile;
  posts: PostModel[];
  postHandler: PostHandler;
  commentHandler: CommentHandler;
}

interface IPostItemProps {
  isLogged: boolean;
  user: Profile;
  post: PostModel;
  postHandler: PostHandler;
  commentHandler: CommentHandler;
}

const renderPostItem = (props: IPostItemProps) => {
  const { isLogged, user, post, commentHandler, postHandler } = props;
  const { id } = post;
  return (
    <li key={id} className={cx('post-item')}>
      <Post
        isLogged={isLogged}
        user={user}
        post={post}
        commentHandler={commentHandler}
        postHandler={postHandler}
      />
    </li>
  );
};

const renderPostList = (props: IProps) => {
  const { isLogged, user, posts, postHandler, commentHandler } = props;
  if (!posts || posts.length === 0) {
    return false;
  }
  return (
    <ul className={cx('post-list')}>
      {posts.map(post =>
        renderPostItem({ isLogged, user, post, postHandler, commentHandler })
      )}
    </ul>
  );
};

const PostWrapper = (props: IProps) => {
  return (
    <div className={cx('post-wrapper')}>
      <p className={cx('post-list-label')}>게시물</p>
      {renderPostList(props)}
    </div>
  );
};

export default PostWrapper;
