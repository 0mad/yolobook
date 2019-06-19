import { action, observable, computed, toJS } from 'mobx';

class CommonStore {
  @observable users!: any[];
  @observable searchText!: string;
  @observable searchActive!: boolean;

  constructor(initialData) {
    if (initialData) {
      const { users, searchActive, searchText } = initialData;
      this.users = !!users ? users : [];
      this.searchText = !!searchText ? searchText : '';
      this.searchActive = !!searchActive ? searchActive : false;
    } else {
      this.initialize();
    }
  }

  private initialize = () => {
    this.users = [];
    this.searchText = '';
    this.searchActive = false;
  }

  @action
  toggleSearch = () => {
    this.searchActive = !this.searchActive;
    return this.searchActive;
  }

  @action
  setUserList = (userList: any[]) => {
    this.users = userList;
  }

  @action
  setSearchText = (searchText: string) => {
    this.searchText = searchText;
  }

  @computed
  get userList() {
    const searchRegExp = new RegExp(this.searchText, 'i');
    const filterdUserList = this.users.filter(user => -1 !== user.username.search(searchRegExp));
    return toJS(filterdUserList);
  }
}

export default CommonStore;
