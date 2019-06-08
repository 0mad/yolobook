import classNames from 'classnames/bind';
import Link from 'next/link';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import Button from '../common/Button';
import styles from './FriendRequest.scss';

const cx = classNames.bind(styles);

export interface IProps {
  requestList: any[];
  type: 'receive' | 'send';
}

export const FriendRequestItem = ({ img, name, id }) => {
  return (
    <li className={cx('friend-item')} key={id}>
      <div className={cx('thumbnail')}>
        <img src={img} />
      </div>
      <div className={cx('content')}>
        <div className={cx('name')}>{name}</div>
        <div className={cx('more-btn')}>
          <Button inline={true} theme="blue" style={{ flex: '1' }}>
            확인
          </Button>
          <Button inline={true} style={{ flex: '1' }}>
            요청 삭제
          </Button>
        </div>
      </div>
    </li>
  );
};

const FriendRequest = ({ requestList, type }: IProps) => {
  return (
    <div className={cx('friend-request')}>
      <div className={cx('request-header')}>
        <h2 className={cx('request-title')}>친구 요청</h2>
        <p className={cx('toggle')}>
          <Link href={'/'}>
            {type === 'receive' ? `전송한 요청 보기` : '수신한 요청 보기'}
          </Link>
        </p>
      </div>
      <ul className={cx('request-list')}>
        {requestList && requestList.map(request => FriendRequestItem(request))}
      </ul>
    </div>
  );
};

export default withSizes(mapSizesToProps)(FriendRequest);
