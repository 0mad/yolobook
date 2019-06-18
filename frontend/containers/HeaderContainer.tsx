import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import Header from '../components/common/Header';
import * as userAPI from '../api/user';

@inject('commonStore', 'userStore')
@observer
class HeaderContainer extends Component{
  searchInputRef: any;

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handdleToggleSearch = this.handdleToggleSearch.bind(this);
  }

  async componentDidMount() {
    const { commonStore } = this.props;
    const { data } = await userAPI.getUserSearchList('');
    
    commonStore.setUserList(data);
  }

  public render() {
    const { commonStore, userStore } = this.props;
    const { searchActive, searchText, userList, onSearchTextChange, toggleSearch } = commonStore;
    const { logged, loggedInfo } = userStore;

    return (
      <Header
        isLogined={logged}
        profile={loggedInfo}
        onLogout={this.handleLogout}
        searchText={searchText}
        userList={userList}
        onSearchTextChange={onSearchTextChange}
        searchActive={searchActive}
        toggleSearch={() => this.handdleToggleSearch(toggleSearch)}
      />
    );
  }

  async handleLogout() {
    const { userStore } = this.props;
    try {
      await userStore.logout();
    } catch(error){
      throw error;
    }
  }

  handdleToggleSearch(toggle) {
    if(toggle()) {
      //TODO 검색에 포커싱 처리
    }
  }
}

export default HeaderContainer;
