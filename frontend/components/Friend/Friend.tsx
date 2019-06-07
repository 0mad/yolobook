import classNames from 'classnames/bind';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import styles from './Friend.scss';

const cx = classNames.bind(styles);

export interface IProps {
  isMobileMode: boolean;
}

const Friend = ({ isMobileMode }: IProps) => {
  return <div className={cx('friend')}>프로필 친구 목록</div>;
};

export default withSizes(mapSizesToProps)(Friend);
