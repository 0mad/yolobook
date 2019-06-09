import className from 'classnames/bind';
import GoogleLogin from 'react-google-login';
import Button from '../common/Button';
import style from './Login.scss';
import LoginButton from './LoginButton';

const cx = className.bind(style);

interface IProps {
  onLoginGoogle: void;
  onLoginKakao: void;
  onLoginNaver: void;
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
            <GoogleLogin
              clientId="523020298734-7c3pe7ghqeeft4a0oqn7h029l11gk2et.apps.googleusercontent.com"
              render={props => (
                <LoginButton provider="google" onClick={props.onClick} />
              )}
              onSuccess={result => onLoginGoogle(result)}
              onFailure={result => console.log(result)}
              cookiePolicy={'single_host_origin'}
            />
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
