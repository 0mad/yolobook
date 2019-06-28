import classNames from 'classnames/bind';
import { withRouter, WithRouterProps } from 'next/router';
import React from 'react';
import styles from './LoginNaver.scss';

const cx = classNames.bind(styles);

interface IProps extends WithRouterProps {
  clientId: string;
  callbackUrl: string;
  isPopup?: boolean;
  render: () => React.ComponentElement<any, any> | Element | JSX.Element;
  onSuccess: (result: any) => void;
  onFailure: (result: any) => void;
}
interface IState {}

/**
 * 이 함수는 브라우저 환경에서만 호출이 되야 한다. window 객체에 직접 접근한다.
 * @param props 
 */
const initLoginButton = (props: IProps) => {
  if(!process.browser) {
    return;
  }
  const { clientId, callbackUrl, onSuccess, isPopup=false } = props;
  const { pathname, hash } = window.location;
  if(!pathname.startsWith('/login')) {
    return;
  }

  const naverLogin = new window.naver.LoginWithNaverId(
    {
      callbackUrl,
      clientId,
      isPopup,
      loginButton: {color: "green", type: 3, height: 60},
    }
  );

  naverLogin.init();
  let tryCount = 0;
  const initLoop = setInterval(() => {
    if(tryCount > 10) {
      clearInterval(initLoop);
    }
    naverLogin.getLoginStatus(status => {
      if (!status || hash.indexOf('#access_token') === -1) {
         return;
      }
      if(isPopup) {
        window.opener.postMessage({...naverLogin.user, naver: true}, window.location.origin);
        window.close();
      } else {
        clearInterval(initLoop);
        onSuccess(naverLogin.user);
      }
    })
    tryCount++;
  }, 100);

  window.addEventListener("message", ({ data }) => {
    if(data.naver) {
      onSuccess(data);
    }
  }, { once: true });
};

class LoginNaver extends React.Component<IProps, IState> {
  private ref: any;

   componentDidMount() {
    if(process.browser) {
      const script = document.createElement('script');
      script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js";
      this.ref.appendChild(script);
      let tryCount = 0;
      const initLoop = setInterval(() => {
        if (tryCount > 10) {
          clearInterval(initLoop);
          return;
        }
        
        if('naver' in window) {
          initLoginButton(this.props)
          clearInterval(initLoop);
        }
        tryCount++;
      }, 100);
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