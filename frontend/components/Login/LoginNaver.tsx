import classNames from 'classnames/bind';
import React from 'react';
import styles from './LoginNaver.scss';

const cx = classNames.bind(styles);

interface IProps {
  clientId: string;
  callbackUrl: string;
  render: any;
  onSuccess: any;
  onFailure: any;
}
interface IState {}

const initLoginButton = ({ clientId, callbackUrl, onSuccess, onFailure }) => {
  const naverLogin = new window.naver.LoginWithNaverId(
    {
      callbackUrl,
      clientId,
      isPopup: false,
      loginButton: {color: "green", type: 3, height: 60},
    }
  );
  
  naverLogin.init();

  window.addEventListener('load', () => {
    naverLogin.getLoginStatus(status => {
      if (status) {
        onSuccess(naverLogin.user);
      } else {
        onFailure(status);
      }
    });
  });
};

class LoginNaver extends React.Component<IProps, IState> {
  private ref: any;
  componentDidMount() {
    if(process.browser) {
      const script = document.createElement('script');
      script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js";
      script.async = true;
      this.ref.appendChild(script);
      const initLoop = setInterval(() => {
        if(window.naver) {
          initLoginButton(this.props)
          clearInterval(initLoop);
        }
      }, 300);
    }
  }

  public render() {
    const { render } = this.props;
    return (
      <div className={cx('naver-login')}>
        <div ref={el => (this.ref = el)} id="naverIdLogin"/>
        {render && render()}
      </div>
    )
  }
}

export default LoginNaver;