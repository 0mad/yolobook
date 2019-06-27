import classNames from 'classnames/bind';
import React, { Component } from 'react';
import styles from './Timeline.scss';

const cx = classNames.bind(styles);

interface IProps {
  isTopSpace?: boolean;
}

class Timeline extends Component<IProps> {
  public render() {
    const { isTopSpace, children } = this.props;

    return (
      <div className={cx('timeline', isTopSpace && 'timeline-space-top')}>
        {React.Children.map(children, child =>
          !!child ? <div className={cx('timeline-item')}>{child}</div> : false
        )}
      </div>
    );
  }
}

export default Timeline;
