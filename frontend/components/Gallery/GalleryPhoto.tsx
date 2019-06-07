import classNames from 'classnames';
import { IoIosChatboxes, IoIosThumbsUp, IoMdCreate } from 'react-icons/io';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import styles from './GalleryPhoto.scss';

const cx = classNames.bind(styles);

interface IProps {
  photo: any;
  isMobileMode: boolean;
  onClickPhoto: () => void;
  onClickLike: () => void;
  onClickComment: () => void;
}

const Photo = (props: IProps) => {
  const {
    photo: { url },
    isMobileMode,
    onClickPhoto,
    onClickLike,
    onClickComment,
  } = props;
  return (
    <div
      className={cx('photo')}
      style={{ backgroundImage: `url(${url})` }}
      onClick={onClickPhoto}
    >
      {false/** 미구현 */ && !isMobileMode && (
        <div className={cx('edit')}>
          <IoMdCreate />
        </div>
      )}
      {false/** 미구현 */ && (<div className={cx('photo-footer')}>
        {!isMobileMode && (
          <span className={cx('button-like')} onClick={onClickLike}>
            좋아요
          </span>
        )}
        {!isMobileMode && (
          <span className={cx('button-comment')} onClick={onClickComment}>
            댓글 달기
          </span>
        )}

        <span className={cx('score-comment')}>
          <IoIosChatboxes />1
        </span>
        <span className={cx('score-like')}>
          <IoIosThumbsUp />2
        </span>
      </div>)}
    </div>
  );
};

export default withSizes(mapSizesToProps)(Photo);
