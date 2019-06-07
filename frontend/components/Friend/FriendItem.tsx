import classNames from 'classnames/bind';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import { IoIosCheckmark } from 'react-icons/io';
import Button from '../common/Button';
import styles from './FriendItem.scss';

const cx = classNames.bind(styles);

export interface IProps {
  img: string;
  name: string;
  cnt: string;
  isMobileMode: boolean;
}

const FriendItem = ({ img, name, cnt, isMobileMode }: IProps) => {
  return (
    <div className={cx('friend-item')}>
      <div className={cx('thumbnail')}>
        <img src={img} />
      </div>
      <div className={cx('content')}>
        <div className={cx('info')}>
          <div className={cx('name')}>{name}</div>
          <div className={cx('friend-cnt')}>
            {isMobileMode ? `함께 아는 친구 ${cnt}명` : `친구 ${cnt}명`}
          </div>
        </div>
        <div className={cx('more-btn')}>
          {isMobileMode ? (
            <Button
              inline={true}
              style={{ width: '120px', padding: '.3rem' }}
              disabled
            >
              <span>친구</span>
            </Button>
          ) : (
            <Button inline={true}>
              <IoIosCheckmark />
              <span>친구</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default withSizes(mapSizesToProps)(FriendItem);
