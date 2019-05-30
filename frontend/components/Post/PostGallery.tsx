import className from 'classnames/bind';
import style from './PostGallery.scss';

const cx = className.bind(style);

interface IProps {
  photoList: any;
}

const Photo = ({ url = '', key, twoSize }) => {
  return (
    <li className={cx('photo-wrapper', { twoSize })} key={key}>
      <img className={cx('photo')} src={url} />
    </li>
  );
};

const PostGallery = (props: IProps) => {
  const { photoList } = props;
  const isOdd = photoList.length && photoList.length % 2 !== 0;
  const isParallel = photoList.length > 3;
  return (
    <ul className={cx('gallery', { isParallel })}>
      {photoList.map((photo, index) =>
        Photo({ ...photo, twoSize: isOdd && index === 0 })
      )}
    </ul>
  );
};

export default PostGallery;
