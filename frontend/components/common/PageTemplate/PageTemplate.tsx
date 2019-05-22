import classNames from 'classnames/bind';
import React, { Component } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

interface IProps {
  children: any;
}

interface IState {
  isLogined: boolean;
}

class PageTemplate extends Component<IProps, IState> {
  public state = {
    isLogined: true,
  };

  public render() {
    const { children } = this.props;
    const { isLogined } = this.state;

    return (
      <div className={cx('page-template', { isLogined })}>
        <Header isLogined={isLogined} />
        {children}
        <Footer />
      </div>
    );
  }
}

export default PageTemplate;
