import classNames from 'classnames/bind';
import { IoIosImages } from 'react-icons/io';
import styles from './Gallery.scss';
import GalleryPhoto from './GalleryPhoto';

const cx = classNames.bind(styles);

interface IProps {
  pictureList: any;
  onClickPhoto: any;
}

const Gallery = (props: IProps) => {
  const { pictureList, onClickPhoto } = props;
  return (
    <div className={cx('gallery')}>
      <div className={cx('gallery-header')}>
        <IoIosImages />
        <span>사진</span>
      </div>
      <ul className={cx('album')}>
        {pictureList.map((picture, idx) => (
          <li className={cx('photo-wrapper')} key={idx}>
            <GalleryPhoto photo={picture} onClickPhoto={() => onClickPhoto(idx)}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
