import className from 'classnames/bind';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import Button from '../common/Button';
import style from './Login.scss';
import LoginButton from './LoginButton';
import LoginNaver from './LoginNaver';

const cx = className.bind(style);

interface IProps {
  onLoginGoogle: (profile: any) => Promise<void>;
  onLoginKakao: (profile: any) => Promise<void>;
  onLoginNaver: (profile: any) => Promise<void>;
}

const lookAroundStyle = {
  fontSize: '15px',
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
              clientId={process.env.REACT_APP_GOOGLE_ID || ''}
              render={(props: any) => (
                <LoginButton provider="google" onClick={props.onClick} />
              )}
              onSuccess={result => onLoginGoogle(result)}
              onFailure={result => console.log(result)}
              cookiePolicy={'single_host_origin'}
            />
          </li>
          <li>
            <KakaoLogin
              jsKey={process.env.REACT_APP_KAKAO_ID || ''}
              onSuccess={result => onLoginKakao(result)}
              onFailure={result => console.log(result)}
              render={(props: any) => (
                <LoginButton provider="kakao" onClick={props.onClick} />
              )}
              getProfile={true}
            />
          </li>
          <li>
            <LoginNaver
              clientId={process.env.REACT_APP_NAVER_ID || ''}
              callbackUrl={process.env.REACT_APP_NAVER_REDIRECT || ''}
              render={(props) => <LoginButton provider="naver" onClick={props.onClick} />}
              onSuccess={(result: any) => onLoginNaver(result)}
              onFailure={(result: any) => console.log(result)}
            />
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
