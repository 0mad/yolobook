import classNames from 'classnames/bind';
import React, { Component } from 'react';
import HeaderContainer from '../../../containers/HeaderContainer';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

interface IProps {
  children: any;
}

class PageTemplate extends Component<IProps> {
  
  public render() {
    const { children } = this.props;

    return (
      <div className={cx('page-template')}>
        <HeaderContainer/>
        <div className={cx('page-content')}>{children}</div>
      </div>
    );
  }
}

export default PageTemplate;
