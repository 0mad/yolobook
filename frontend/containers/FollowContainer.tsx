import { RouterProps, withRouter } from 'next/router';
import React, { Component } from 'react';
import Follow from '../components/Follow';

interface IProps extends RouterProps<any> {}
interface IState {}

class FollowContainer extends Component<IProps, IState> {
  public render() {
    const {
      router: {
        query: { type },
      },
    } = this.props;
    const randomNum = () => 500 + Math.floor(Math.random() * Math.floor(100));
    const names = [
      '문태민',
      '유주현',
      'V',
      '정국',
      '지민',
      'RM',
      '진',
      '제이홉',
      '슈가',
    ];
    const requestList = names.map(name => ({
      id: name,
      img: `http://placekitten.com/${randomNum()}/${randomNum()}`,
      name,
    }));
    return <Follow requestList={requestList} type={type} />;
  }
}

export default withRouter(FollowContainer);
