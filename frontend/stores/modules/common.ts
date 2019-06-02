import { action, observable } from 'mobx';

class CommonStore {
  @observable
  public header: any;

  constructor(initialData = {}) {
    const { header } = initialData;
    this.header = !!header
      ? header
      : {
          visible: true,
        };
  }

  @action
  public setHeaderVisibility = (visible: boolean) => {
    this.header.visible = visible;
  };
}

export default CommonStore;
