import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import * as PostAPI from '../api/post';
import Editor from '../components/Editor';

interface IProps {
  postStore?: any;
  userStore?: any;
}

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
      const res = await postStore.uploadImgs(files);
      postStore.setImgUrlsOfEditPostForm(res.data);
      toast.success('이미지 업로드 성공');
    } catch (error) {
      postStore.initImgUrlsOfEditPostForm();
      toast.error('이미지 업로드 실패');
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
      const res = await PostAPI.writePost(
        editPostForm.content,
        editPostForm.imgUrls
      );
      postStore.initEditPostForm();
      postStore.addPost(res.data);
      toast.success('포스트 작성 성공');
    } catch (error) {
      postStore.initEditPostForm();
      toast.error('포스트 작성 실패');
    }
  };

  public render() {
    const {
      userStore: { loggedInfo },
      postStore: {
        editPostForm: { content, imgUrls },
      },
    } = this.props;

    return (
      <Editor
        onTextChange={this.handleTextChange}
        onImgsChange={this.handleImgsChange}
        onSubmit={this.handleSubmit}
        content={content}
        imgUrls={imgUrls}
        profile={loggedInfo}
      />
    );
  }
}

export default EditorContainer;
