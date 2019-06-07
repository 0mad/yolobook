import classNames from 'classnames/bind';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import { IoIosCheckmark } from 'react-icons/io';
import Button from '../common/Button';
import styles from './FriendItem.scss';

const cx = classNames.bind(styles);

export interface IProps {
  isMobileMode: boolean;
}

const FriendItem = ({ isMobileMode }: IProps) => {
  return (
    <div className={cx('friend-item')}>
      <div className={cx('thumbnail')}>
        <img src={'http://placekitten.com/1000/1000'} />
      </div>
      <div className={cx('content')}>
        <div className={cx('info')}>
          <div className={cx('name')}>문태민</div>
          <div className={cx('friend-cnt')}>
            {isMobileMode ? '함께 아는 친구 1000명' : '친구 1000명'}
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
