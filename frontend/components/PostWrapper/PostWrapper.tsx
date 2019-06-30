import classNames from 'classnames/bind';
import Post from '../Post';
import styles from './PostWrapper.scss';

const cx = classNames.bind(styles);

interface IProps {
  posts: any;
  onClickPhoto: any;
}

const renderPostItem = (data: { post: object; onClickPhoto: any }) => {
  const { post, onClickPhoto } = data;
  const { id, user } = post;
  return (
    <li key={id} className={cx('post-item')}>
      <Post post={post} onClickPhoto={onClickPhoto} />
    </li>
  );
};

const renderPostList = (props: IProps) => {
  const { posts, onClickPhoto } = props;
  if (!posts || posts.length === 0) {
    return false;
  }
  return (
    <ul className={cx('post-list')}>
      {posts.map(post => renderPostItem({ post, onClickPhoto }))}
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
