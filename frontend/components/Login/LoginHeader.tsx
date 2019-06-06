import classNames from 'classnames/bind';
import styles from './LoginHeader.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

interface IProps {}

const LoginHeader = (props: IProps) => {
  return (
    <div className={cx('login-header')}>
      <Link href={'/'}>yolobook</Link>
    </div>
  );
};

export default LoginHeader;