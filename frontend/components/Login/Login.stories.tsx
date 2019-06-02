import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Login from './Login';
import LoginButton from './LoginButton';

const Wrapper = ({ children, style = {} }) => (
  <div style={{ display: 'block', ...style }}>{children}</div>
);

const googleAction = action('google login');
const kakaoAction = action('kakao login');
const naverAction = action('naver login');

storiesOf('Login', module)
  .add('로그인 버튼', () => (
    <>
      <LoginButton provider="google" onClick={googleAction} />
      <LoginButton provider="kakao" onClick={kakaoAction} />
      <LoginButton provider="naver" onClick={naverAction} />
    </>
  ))
  .add('소셜 로그인', () => (
    <Wrapper style={{ backgroundColor: 'lightgray' }}>
      <Login
        onLoginGoogle={googleAction}
        onLoginKakao={kakaoAction}
        onLoginNaver={naverAction}
      />
    </Wrapper>
  ));
