import classNames from 'classnames/bind';
import styles from './LoginFooter.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

interface IProps {}

const LoginFooter = (props: IProps) => {
  const {} = props;
  return (
    <div className={cx('login-footer')}>
      <p className={cx('footer-content')}>
        Provided By&nbsp;
        <Link href="https://github.com/0mad/yolobook">
          <span className={cx('github')}>0mad</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginFooter;
