import classNames from 'classnames/bind';
import Comment from '../Comment';
import Post from '../Post';
import styles from './PostWrapper.scss';

const cx = classNames.bind(styles);

interface IProps {
  posts: any;
  user: any;
}

const renderPostItem = ({ post, user }) => {
  return (
    <li className={cx('post-item')}>
      <Post post={post} />
      <Comment user={user} commentData={post.commentData} />
    </li>
  );
};

const renderPostList = ({ posts, user }) => {
  if (!posts || posts.length === 0) {
    return false;
  }
  return (
    <ul className={cx('post-list')}>
      {posts.map(post => renderPostItem({ post, user }))}
    </ul>
  );
};

const PostWrapper = (props: IProps) => {
  const { posts, user } = props;
  return (
    <div className={cx('post-wrapper')}>
      <p className={cx('post-list-label')}>게시물</p>
      {renderPostList({ posts, user })}
    </div>
  );
};

export default PostWrapper;
