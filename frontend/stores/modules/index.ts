import CommonStore from './common';

class RootStore {
  public common: CommonStore;

  constructor(initialData = {}) {
    this.common = new CommonStore(initialData.common);
  }
}

export default RootStore;
