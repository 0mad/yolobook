import classNames from 'classnames/bind';
import React, { Component } from 'react';
import styles from './ContentLayout.scss';

const cx = classNames.bind(styles);

interface IProps {
  children: any;
  Banner?: any;
}

class ContentLayout extends Component<IProps> {
  public render() {
    const { children, Banner } = this.props;
    return (
      <div className={cx('content-layout')}>
        {Banner && <Banner />}
        {React.Children.map(children, child => (
          <div className={cx('content-item')}>{child}</div>
        ))}
      </div>
    );
  }
}

export default ContentLayout;
