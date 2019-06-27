import { action, observable } from 'mobx';
import * as PostAPI from '../../api/post';

class PostStore {
  @observable public editPostForm: any;
  @observable public posts: any;

  constructor(initialData = {}) {
    const { editPostForm, posts } = initialData;
    this.editPostForm = !!editPostForm
      ? editPostForm
      : this.getInitEditPostFormData();
    this.posts = !!posts ? posts : this.initPosts();
  }

  @action
  public initEditPostForm = () => {
    this.editPostForm = this.getInitEditPostFormData();
  };

  @action
  public initImgUrlsOfEditPostForm = () => {
    this.editPostForm.imgUrls = {};
  };

  @action
  public setContentOfEditPostForm = (content: string) => {
    this.editPostForm.content = content;
  };

  @action
  public setImgUrlsOfEditPostForm = (imgUrls: object) => {
    this.editPostForm.imgUrls = imgUrls;
  };

  @action
  public initPosts = () => {
    this.posts = [];
  };

  @action
  public setPosts = (posts: object) => {
    this.posts = posts;
  };

  @action
  public addPost = (post: object) => {
    this.posts.unshift(post);
    console.log(post);
  };

  @action
  public uploadImgs = async (imgs: any) => {
    if (imgs.length < 1) {
      throw new Error('The size of the array is 0');
    }

    const formData: FormData = new FormData();
    for (const img of imgs) {
      formData.append('imgs', img);
    }
    try {
      return await PostAPI.uploadImgs(formData);
    } catch (error) {
      throw error;
    }
  };

  private getInitEditPostFormData = () => ({
    content: '',
    imgUrls: [],
  });
}

export default PostStore;
