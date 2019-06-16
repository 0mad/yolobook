import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import * as PostAPI from '../api/post';
import Editor from '../components/Editor';

@inject('postStore', 'userStore')
@observer
class EditorContainer extends Component<IProps> {

  componentWillUnmount() {
    const { postStore } = this.props;
    postStore.initEditPostForm();
  }

  public handleTextChange = (event: React.ChangeEvent) => {
    const { value } = event.target;
    const { postStore } = this.props;
    postStore.setContentOfEditPostForm(value);
  };

  public handleImgsChange = async (event: React.ChangeEvent) => {
    event.preventDefault();

    const files = event.target.files;
    if (files.length < 1) {
      return;
    }

    const { postStore } = this.props;
    try {
      await postStore.uploadImgs(files);
      const {
        results: { urls },
      } = postStore;
      postStore.setImgUrlsOfEditPostForm(urls);
    } catch (error) {
      postStore.initImgUrlsOfEditPostForm();
    }
  };

  public handleSubmit = async () => {
    const { postStore } = this.props;
    const { editPostForm } = postStore;
   
    if (editPostForm.content.length < 1) {
      return;
    }

    try {
      await PostAPI.writePost(editPostForm.content, editPostForm.imgUrls);
    } catch (error) {
      postStore.initEditPostForm();
    }
  };

  public render() {
    const { userStore: { loggedInfo}} = this.props;
    return (
      <Editor
        onTextChange={this.handleTextChange}
        onImgsChange={this.handleImgsChange}
        onSubmit={this.handleSubmit}
        profile={loggedInfo}
      />
    );
  }
}

export default EditorContainer;
