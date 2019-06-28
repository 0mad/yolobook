import { action, observable, computed, toJS } from 'mobx';

class ViewerStore {
  @observable images!: any[];
  @observable currentIdx!: number;
  @observable username!: string;

  constructor(initialData: any) {
    if (initialData) {
      const { images, currentIdx } = initialData;
      this.images = !!images ? images : [];
      this.currentIdx = !!currentIdx ? currentIdx : 0;
    } else {
      this.initialize();
    }
  }

  private initialize = () => {
    this.images = [];
    this.currentIdx = 0;
  }

  @action
  public setViewerData(data: { currentIndex: number, images: any[], username: string }) {
    this.currentIdx = data.currentIndex;
    this.images = data.images;
    this.username = data.username;
  }

  @action
  public setCurrentIndex(currentIdx: number) {
    this.currentIdx = currentIdx;
  }

  @action
  public moveNext() {
    this.currentIdx = Math.min(this.currentIdx + 1, this.images.length - 1);
  }

  @action
  public movePrev() {
    this.currentIdx = Math.max(this.currentIdx - 1, 0);
  }

  @action
  public clear() {
    this.initialize();
  }

  @computed
  get imageList() {
    return toJS(this.images);
  }

  @computed
  get currentIndex() {
    return this.currentIdx;
  }
}

export default ViewerStore;
