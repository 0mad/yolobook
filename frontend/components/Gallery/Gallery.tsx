import classNames from 'classnames/bind';
import { IoIosImages } from 'react-icons/io';
import styles from './Gallery.scss';
import Photo from './GalleryPhoto';

const cx = classNames.bind(styles);

interface IProps {
  album: any;
}

const Gallery = (props: IProps) => {
  const {
    album: { photoList },
  } = props;
  return (
    <div className={cx('gallery')}>
      <div className={cx('gallery-header')}>
        <IoIosImages />
        <span>사진</span>
      </div>
      <ul className={cx('album')}>
        {photoList.map((photo, idx) => (
          <li className={cx('photo-wrapper')} key={idx}>
            <Photo photo={photo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
