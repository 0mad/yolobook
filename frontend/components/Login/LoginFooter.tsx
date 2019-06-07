import classNames from 'classnames/bind';
import { IoLogoGithub } from 'react-icons/io';
import styles from './LoginFooter.scss';

const cx = classNames.bind(styles);

interface IProps {}

const LoginFooter = (props: IProps) => {
  const {} = props;
  return (
    <div className={cx('login-footer')}>
      <p className={cx('footer-content')}>
        Provided
        <a href="https://github.com/orgs/0mad/dashboard">
          <span className={cx('team')}>0mad</span>
        </a>
        <a href="https://github.com/0mad/yolobook">
          <IoLogoGithub />
          <span className={cx('github')}>Github</span>
        </a>
      </p>
    </div>
  );
};

export default LoginFooter;
