import classNames from 'classnames/bind';
import { withRouter, WithRouterProps } from 'next/router';
import React from 'react';
import styles from './LoginNaver.scss';

const cx = classNames.bind(styles);

interface IProps extends WithRouterProps {
  clientId: string;
  callbackUrl: string;
  render: () => React.ComponentElement<any, any> | Element | JSX.Element;
  onSuccess: (result: any) => void;
  onFailure: (result: any) => void;
}
interface IState {}

const initLoginButton = (props: IProps) => {
  const { router, clientId, callbackUrl, onSuccess, onFailure } = props;
  const { query: { naver } } = router;
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
      if (status && naver) {
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
        if('naver' in window) {
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

export default withRouter(LoginNaver);