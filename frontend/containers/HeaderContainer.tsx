import { inject, observer } from 'mobx-react';
import React, { Component, ChangeEventHandler } from 'react';
import Header from '../components/common/Header';
import * as userAPI from '../api/user';

interface IProps {
  commonStore?: any;
  userStore?: any;
}

@inject('commonStore', 'userStore')
@observer
class HeaderContainer extends Component<IProps> {
  searchInputRef: any;

  async componentDidMount() {
    const { commonStore } = this.props;
    const { data } = await userAPI.getUserSearchList('');

    commonStore.setUserList(data);
  }

  public render() {
    const { commonStore, userStore } = this.props;
    const { searchActive, searchText, userList, toggleSearch } = commonStore;
    const { logged, loggedInfo } = userStore;

    return (
      <Header
        isLogined={logged}
        profile={loggedInfo}
        onLogout={this.handleLogout}
        searchText={searchText}
        userList={userList}
        onSearchTextChange={this.handleSearchChange}
        searchActive={searchActive}
        toggleSearch={() => this.handleToggleSearch(toggleSearch)}
      />
    );
  }

  handleLogout = async () => {
    const { userStore } = this.props;
    try {
      await userStore.logout();
    } catch (error) {
      throw error;
    }
  };

  handleToggleSearch = (toggle: () => boolean) => {
    if (toggle()) {
      //TODO 검색에 포커싱 처리
    }
  };

  handleSearchChange: ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value },
    } = event;
    const { commonStore } = this.props;
    commonStore.setSearchText(value);
  };
}

export default HeaderContainer;
