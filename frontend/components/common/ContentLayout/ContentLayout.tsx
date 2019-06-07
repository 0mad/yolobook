import classNames from 'classnames/bind';
import React, { Component } from 'react';
import styles from './ContentLayout.scss';

const cx = classNames.bind(styles);

interface IProps {
  children: any;
}

class ContentLayout extends Component<IProps> {
  public render() {
    const { children } = this.props;
    return (
      <div className={cx('content-layout')}>
        {React.Children.map(children, child => (
          <div className={cx('content-item')}>{child}</div>
        ))}
      </div>
    );
  }
}

export default ContentLayout;
