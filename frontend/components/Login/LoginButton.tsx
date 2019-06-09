import className from 'classnames/bind';
import { IoIosText, IoLogoGoogle } from 'react-icons/io';
import naverLogo from '../../static/images/naver-logo.png';
import style from './LoginButton.scss';

const cx = className.bind(style);

type Provider = 'google' | 'kakao' | 'naver';
interface IProps {
  onClick?: () => void;
  provider: Provider;
}

const ButtonContent = (provider: Provider) => {
  if (provider === 'google') {
    return (
      <>
        <IoLogoGoogle className={cx('button-icon')} />
        <span className={cx('button-text')}>Google 로그인</span>
      </>
    );
  }
  if (provider === 'kakao') {
    return (
      <>
        <IoIosText className={cx('button-icon')} />
        <span className={cx('button-text')}>Kakao 로그인</span>
      </>
    );
  }
  if (provider === 'naver') {
    return (
      <>
        <img className={cx('button-icon')} src={naverLogo} />
        <span className={cx('button-text')}>Naver 로그인</span>
      </>
    );
  }
  return false;
};

const LoginButton = (props: IProps) => {
  const { onClick, provider } = props;
  return (
    <div className={cx('login-button', provider)} onClick={onClick}>
      {ButtonContent(provider)}
    </div>
  );
};

export default LoginButton;
