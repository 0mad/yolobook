import classNames from 'classnames/bind';
import Link from 'next/link';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import Button from '../common/Button';
import styles from './Follow.scss';

const cx = classNames.bind(styles);

interface IFollowItemProps {
  id: number;
  profile: any;
  type: 'follower' | 'following';
  onAccept: (followId: number) => Promise<void>;
  onReject: (followId: number) => Promise<void>;
  onCancel: (followId: number) => Promise<void>;
}

interface IProps extends IFollowItemProps {
  followList: any[];
}

export const FollowItem = (props: IFollowItemProps) => {
  const { id, profile, type, onAccept, onReject , onCancel } = props;
  return (
    <li className={cx('follow-item')} key={id}>
      <div className={cx('thumbnail')}>
        <img src={profile.thumbnail} />
      </div>
      <div className={cx('content')}>
        <div className={cx('name')}>{profile.username}</div>
        <div className={cx('more-btn')}>
          {type === 'follower' ? (
            <>
              <Button inline={true} theme="blue" style={{ flex: '1' }} onClick={() => onAccept(id)}>
                수락
              </Button>
              <Button inline={true} style={{ flex: '1' }} onClick={() => onReject(id)}>
                요청 삭제
              </Button>
            </>
          ) : (
            <Button inline={true} onClick={() => onCancel(id)}>친구 요청 취소</Button>
          )}
        </div>
      </div>
    </li>
  );
};

const Follow = ({ followList, type, onAccept, onReject , onCancel }: IProps) => {
  return (
    <div className={cx('follow')}>
      <div className={cx('follow-header')}>
        <h2 className={cx('follow-title')}>친구 요청</h2>
        <p className={cx('toggle')}>
          <Link href={type === 'follower' ? '/follow/following' :  '/follow/follower'}>
            <span>{type === 'follower' ? `전송한 요청 보기` : '수신한 요청 보기'}</span>
          </Link>
        </p>
      </div>
      <ul className={cx('follow-list')}>
        {followList &&
          followList.map(follow => FollowItem({ ...follow, type, onAccept, onReject , onCancel }))}
      </ul>
    </div>
  );
};

export default withSizes(mapSizesToProps)(Follow);
