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
  images: string[];
}

const Viewer = ({ isMobileMode, images }: IProps) => {
  let curIdx = 2;

  const handleChangePrevImage = () => {
    curIdx = curIdx === 0 ? curIdx : curIdx - 1;
    const imgEl = document.querySelector('#content>img');
    imgEl.src = images[curIdx];
  };

  const handleChangeNextImage = () => {
    curIdx = curIdx === images.length - 1 ? curIdx : curIdx + 1;
    const imgEl = document.querySelector('#content>img');
    imgEl.src = images[curIdx];
  };

  return (
    <div className={cx('viewer')}>
      <div className={cx('header')}>
        {isMobileMode && (
          <div className={cx('back-btn')}>
            <IoIosArrowRoundBack />
          </div>
        )}
        <div className={cx('title')}>
          <span>주현님이 게시한 사진</span>
        </div>
      </div>
      <div id={'content'} className={cx('content')}>
        <img src={images[curIdx]} />
      </div>
      {isMobileMode && <div className={cx('footer')}>footer</div>}
      {!isMobileMode && (
        <div className={cx('close-btn')}>
          <IoIosClose />
        </div>
      )}
      <div className={cx('prev-btn')} onClick={handleChangePrevImage}>
        {isMobileMode ? <IoIosArrowDropleftCircle /> : <IoIosArrowBack />}
      </div>
      <div className={cx('next-btn')} onClick={handleChangeNextImage}>
        {isMobileMode ? <IoIosArrowDroprightCircle /> : <IoIosArrowForward />}
      </div>
    </div>
  );
};

export default withSizes(mapSizesToProps)(Viewer);
