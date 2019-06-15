import classNames from 'classnames/bind';
import Comment from '../Comment';
import Post from '../Post';
import styles from './PostWrapper.scss';

const cx = classNames.bind(styles);

interface IProps {
  posts: any;
}

const renderPostItem = (post: object) => {
  return (
    <li className={cx('post-item')}>
      <Post post={post} />
      <Comment user={post.user} />
    </li>
  );
};

const renderPostList = (posts: Array<object>) => {
  if (!posts || posts.length === 0) {
    return false;
  }
  return (
    <ul className={cx('post-list')}>
      {posts.map(post => renderPostItem(post))}
    </ul>
  );
};

const PostWrapper = (props: IProps) => {
  const { posts } = props;
  return (
    <div className={cx('post-wrapper')}>
      <p className={cx('post-list-label')}>게시물</p>
      {renderPostList(posts)}
    </div>
  );
};

export default PostWrapper;
