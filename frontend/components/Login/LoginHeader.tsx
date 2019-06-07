import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './LoginHeader.scss';

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
