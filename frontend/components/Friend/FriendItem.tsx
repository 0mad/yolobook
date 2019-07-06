import classNames from 'classnames/bind';
import Link from 'next/link';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import { IoIosCheckmark } from 'react-icons/io';
import Button from '../common/Button';
import styles from './FriendItem.scss';

const cx = classNames.bind(styles);

export interface IProps {
  thumbnail: string;
  username: string;
  cnt?: string;
  userId: number;
  isMobileMode: boolean;
}

const FriendItem = ({
  thumbnail,
  username,
  cnt,
  isMobileMode,
  userId,
}: IProps) => {
  return (
    <div className={cx('friend-item')}>
      <Link href={`/profile/timeline/${userId}`}>
        <a>
          <div className={cx('thumbnail')}>
            <img src={thumbnail} />
          </div>
        </a>
      </Link>
      <div className={cx('content')}>
        <div className={cx('info')}>
          <Link href={`/profile/timeline/${userId}`}>
            <a>
              <div className={cx('name')}>{username}</div>
            </a>
          </Link>
          {cnt && (
            <div className={cx('friend-cnt')}>
              {isMobileMode ? `함께 아는 친구 ${cnt}명` : `친구 ${cnt}명`}
            </div>
          )}
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
