import className from 'classnames/bind';
import Link from 'next/link';
import style from './PostGallery.scss';

const cx = className.bind(style);

interface IProps {
  images: any[];
  onClickPhoto: any;
  username: string;
}

const Photo = (props: {
  img: string;
  id: number;
  isOdd: boolean;
  children: any;
  onClickPhoto: any;
  index: number;
}) => {
  const { img = '', children, onClickPhoto, index } = props;
  return (
    <div className={cx('photo-wrapper')} onClick={() => onClickPhoto(index)}>
      <img className={cx('photo')} src={img} />
      {children}
    </div>
  );
};

const PostGallery = (props: IProps) => {
  const { images, onClickPhoto, username } = props;
  const isParallel = [2, 4].includes(images.length);
  const overCount = images.length - 5 > 0 ? images.length - 5 : 0;
  return (
    <ul className={cx('gallery', { isParallel })}>
      {images
        .filter((_, index) => index < 5)
        .map((photo, index) => (
          <li key={photo.id}>
            <Photo
              {...photo}
              index={index}
              onClickPhoto={(currentIndex: number) =>
                onClickPhoto({ currentIndex, images, username })
              }
            >
              {index === 4 && overCount > 0 && (
                <Link href="">
                  <a className={cx('rest')}>{`${overCount}장+`}</a>
                </Link>
              )}
            </Photo>
          </li>
        ))}
    </ul>
  );
};

export default PostGallery;
