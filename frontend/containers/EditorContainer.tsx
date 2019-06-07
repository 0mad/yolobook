import React, { Component } from 'react';
import Editor from '../components/Editor';

interface IProps {}
interface IState {}

class BannerContainer extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  public render() {
    return <Editor />;
  }
}

export default BannerContainer;
