import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import Editor from '../components/Editor';
import * as PostAPI from '../api/post';

interface IProps {}

@inject('postStore')
@observer
class EditorContainer extends Component<IProps> {
  componentWillUnmount() {
    const { postStore } = this.props;
    postStore.initEditPostForm();
  }

  public handleTextChange = (event: React.ChangeEvent) => {
    const { value } = event.target;
    console.log(value);
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
    return (
      <Editor
        onTextChange={this.handleTextChange}
        onImgsChange={this.handleImgsChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default EditorContainer;
