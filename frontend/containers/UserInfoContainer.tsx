import React, { Component, MouseEventHandler, ChangeEventHandler } from 'react';
import { toast } from 'react-toastify';
import { inject, observer } from 'mobx-react';
import { withRouter, WithRouterProps } from 'next/router';
import * as UserAPI from '../api/user';
import UserInfo from '../components/UserInfo';

interface IProps extends WithRouterProps {
  userStore?: any;
}

interface IState {
  description: string;
  editDescription: string;
  isEdit: boolean;
}

@inject('userStore')
@observer
class UserInfoContainer extends Component<IProps, IState> {
  state = {
    description: '',
    editDescription: '',
    isEdit: false
  }

  componentDidMount = async () => {
    const {
      router: {
        query: { userId },
      },
    } = this.props;
    try {
      const { data: { description } } = await UserAPI.getUserInfo(userId);
      this.setState({
        description,
        editDescription: description
      })
    } catch (error) {
      this.setState({
        description: '사용자 정보를 가져오는데 실패했습니다.',
        isEdit: false
      });
    }
  }

  public render() {
    const { description, editDescription, isEdit } = this.state;
    const {
      router: {
        query: { userId },
      },
    } = this.props;
    const { userStore: { loggedInfo } } = this.props;
    const canModify = parseInt(userId, 10) === loggedInfo.id;
    return (
      <UserInfo 
        description={description} 
        editDescription={editDescription}
        canModify={canModify}
        isEdit={isEdit}
        onChangeInput={this.handleChangeInput}
        onModify={this.handleModifyDescription}
        onToggleEdit={this.handleToggleEditState}
      />
    );
  }

  handleToggleEditState = () => {
    this.setState(state => ({
      isEdit: !state.isEdit
    }))
  }

  handleChangeInput: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const { target: { name, value} } = event;
    this.setState({
      [name]: value
    });
  }

  handleModifyDescription: MouseEventHandler<HTMLTextAreaElement> = async (event) => {
    event.preventDefault();
    const { userStore } = this.props;
    const { editDescription } = this.state;
    try {
      const { data } = await UserAPI.modifyUserInfo({
        description: editDescription
      });
      userStore!.setLoggedInfo(data);
      this.setState({
        description: data.description,
        editDescription: data.description,
        isEdit: false,
      })
      toast.success('사용자 정보 변경 성공');
    } catch (error) {
      toast.error('사용자 정보 변경 실패');
      throw error;
    }
  };
}

export default withRouter(UserInfoContainer);
