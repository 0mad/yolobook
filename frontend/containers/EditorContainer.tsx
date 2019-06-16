import { inject, observer } from 'mobx-react';
import Router from 'next/router';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
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
      toast.success('이미지 업로드 성공');
    } catch (error) {
      postStore.initImgUrlsOfEditPostForm();
      toast.success('이미지 업로드 실패');
    }
  };

  public handleSubmit = async (event: any) => {
    event.preventDefault();

    const { postStore } = this.props;
    const { editPostForm } = postStore;

    if (editPostForm.content.length < 1) {
      return;
    }

    try {
      await PostAPI.writePost(editPostForm.content, editPostForm.imgUrls);
      postStore.initEditPostForm();
      toast.success('포스트 작성 성공');
    } catch (error) {
      postStore.initEditPostForm();
      toast.error('포스트 작성 실패');
    }
    location.reload();
  };

  public render() {
    const {
      userStore: { loggedInfo, logged },
      postStore: {
        editPostForm: { content },
      },
    } = this.props;
    return !!logged ? (
      <Editor
        onTextChange={this.handleTextChange}
        onImgsChange={this.handleImgsChange}
        onSubmit={this.handleSubmit}
        content={content}
        profile={loggedInfo}
      />
    ) : (
      false
    );
  }
}

export default EditorContainer;
