import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './LoginHeader.scss';

const cx = classNames.bind(styles);

const LoginHeader = () => {
  return (
    <div className={cx('login-header')}>
      <Link href={'/'}>
        <a>
          <span>yolobook</span>
        </a>
      </Link>
    </div>
  );
};

export default LoginHeader;
