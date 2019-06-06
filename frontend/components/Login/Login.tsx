import className from 'classnames/bind';
import Button from '../common/Button';
import style from './Login.scss';
import LoginButton from './LoginButton';

const cx = className.bind(style);

interface IProps {
  onLoginGoogle: () => void;
  onLoginKakao: () => void;
  onLoginNaver: () => void;
}

const lookAroundStyle = {
  fontSize: '1.2rem',
  marginTop: '1rem',
};

const Login = (props: IProps) => {
  const { onLoginGoogle, onLoginKakao, onLoginNaver } = props;
  return (
    <div className={cx('login')}>
      <div className={cx('login-box')}>
        <ul className={cx('button-list')}>
          <li>
            <LoginButton provider="google" onClick={onLoginGoogle} />
          </li>
          <li>
            <LoginButton provider="kakao" onClick={onLoginKakao} />
          </li>
          <li>
            <LoginButton provider="naver" onClick={onLoginNaver} />
          </li>
        </ul>
        <Button inline={true} href="/" style={lookAroundStyle}>
          로그인하지 않고 둘러보기
        </Button>
      </div>
    </div>
  );
};

export default Login;
