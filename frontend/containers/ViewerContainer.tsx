import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Viewer from '../components/Viewer';

interface IProps {
  viewerStore?: any;
}

@inject('viewerStore')
@observer
class ViewerContainer extends Component<IProps> {
  public render() {
    const { viewerStore } = this.props;
    const { imageList, currentIndex, username } = viewerStore;

    const xlgImageList = imageList.map((image: object) => {
      const { img: oldImg } = image;
      const img = `${oldImg.substring(
        0,
        oldImg.lastIndexOf('-')
      )}-xls${oldImg.substring(oldImg.lastIndexOf('.'))}`;
      return {
        ...image,
        img,
      };
    });

    return imageList.length > 0 ? (
      <Viewer
        isMobileMode={true}
        images={imageList}
        currentIndex={currentIndex}
        onMoveNext={this.handleMoveNextPhoto}
        onMovePrev={this.handleMovePrevPhoto}
        onClose={this.handleClose}
        username={username}
      />
    ) : (
      false
    );
  }

  public handleMoveNextPhoto = () => {
    const { viewerStore } = this.props;
    viewerStore.moveNext();
  };

  public handleMovePrevPhoto = () => {
    const { viewerStore } = this.props;
    viewerStore.movePrev();
  };

  public handleClose = () => {
    const { viewerStore } = this.props;
    viewerStore.clear();
  };
}

export default ViewerContainer;
