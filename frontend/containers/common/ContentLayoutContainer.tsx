import React, { Component } from 'react';
import ContentLayout from '../../components/common/ContentLayout';
import { observer, inject } from 'mobx-react';

interface IProps {
  children: any;
  Banner?: any;
  Editor?: any;
}

@inject('userStore')
@observer
class ContentLayoutContainer extends Component<IProps> {
  public render() {
    const {
      children,
      Banner,
      Editor,
      userStore: { logged },
    } = this.props;
    const editor = !!logged ? Editor : false;
    return (
      <ContentLayout Banner={Banner} Editor={editor}>
        {children}
      </ContentLayout>
    );
  }
}

export default ContentLayoutContainer;
