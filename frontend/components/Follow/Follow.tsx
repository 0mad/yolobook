import classNames from 'classnames/bind';
import Link from 'next/link';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import Button from '../common/Button';
import styles from './Follow.scss';

const cx = classNames.bind(styles);

export interface IProps {
  requestList: any[];
  type: 'receive' | 'send';
}

export const FollowItem = ({ img, name, id, type }) => {
  return (
    <li className={cx('follow-item')} key={id}>
      <div className={cx('thumbnail')}>
        <img src={img} />
      </div>
      <div className={cx('content')}>
        <div className={cx('name')}>{name}</div>
        <div className={cx('more-btn')}>
          {type === 'receive' ? (
            <>
              <Button inline={true} theme="blue" style={{ flex: '1' }}>
                수락
              </Button>
              <Button inline={true} style={{ flex: '1' }}>
                요청 삭제
              </Button>
            </>
          ) : (
            <Button inline={true}>친구 요청 취소</Button>
          )}
        </div>
      </div>
    </li>
  );
};

const Follow = ({ requestList, type }: IProps) => {
  return (
    <div className={cx('follow')}>
      <div className={cx('follow-header')}>
        <h2 className={cx('follow-title')}>친구 요청</h2>
        <p className={cx('toggle')}>
          <Link href={type === 'receive' ? '/follow/send' : '/follow/receive'}>
            {type === 'receive' ? `전송한 요청 보기` : '수신한 요청 보기'}
          </Link>
        </p>
      </div>
      <ul className={cx('follow-list')}>
        {requestList &&
          requestList.map(request => FollowItem({ ...request, type }))}
      </ul>
    </div>
  );
};

export default withSizes(mapSizesToProps)(Follow);
