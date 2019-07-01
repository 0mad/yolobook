import classNames from 'classnames/bind';
import {
  IoIosArrowBack,
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosArrowForward,
  IoIosArrowRoundBack,
  IoIosClose,
} from 'react-icons/io';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import styles from './Viewer.scss';

const cx = classNames.bind(styles);

interface IProps {
  isMobileMode: boolean;
  images: any[];
  currentIndex: number;
  onMoveNext: any;
  onMovePrev: any;
  onClose: any;
  username: string;
}

const Viewer = ({ isMobileMode, images, currentIndex, onMoveNext, onMovePrev, onClose, username }: IProps) => {
  return (
    <div className={cx('viewer')}>
      <div className={cx('header')}>
        {isMobileMode && (
          <div className={cx('back-btn')} onClick={() => onClose()}>
            <IoIosArrowRoundBack />
          </div>
        )}
        <div className={cx('title')}>
          <span>{`${username}님이 게시한 사진`}</span>
        </div>
      </div>
      <div id={'content'} className={cx('content')}>
        <img src={images[currentIndex]['img']} />
      </div>
      {isMobileMode && <div className={cx('footer')}>footer</div>}
      {!isMobileMode && (
        <div className={cx('close-btn')} onClick={() => onClose()}>
          <IoIosClose />
        </div>
      )}
      <div className={cx('prev-btn')} onClick={() => onMovePrev()}>
        {isMobileMode ? <IoIosArrowDropleftCircle /> : <IoIosArrowBack />}
      </div>
      <div className={cx('next-btn')} onClick={() => onMoveNext()}>
        {isMobileMode ? <IoIosArrowDroprightCircle /> : <IoIosArrowForward />}
      </div>
    </div>
  );
};

export default withSizes(mapSizesToProps)(Viewer);
