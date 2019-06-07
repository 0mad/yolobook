import classNames from 'classnames/bind';
import React, { Component } from 'react';
import Footer from './LoginFooter';
import Header from './LoginHeader';
import styles from './LoginTemplate.scss';

const cx = classNames.bind(styles);

interface IProps {
  children: any;
}

class PageTemplate extends Component<IProps> {
  public render() {
    const { children } = this.props;

    return (
      <div className={cx('login-template')}>
        <Header />
        <div className={cx('content-wrapper')}>{children}</div>
        <Footer />
      </div>
    );
  }
}

export default PageTemplate;
