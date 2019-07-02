import React, { MouseEventHandler, ChangeEventHandler } from 'react';
import classNames from 'classnames/bind';
import { IoIosPerson, IoMdCreate } from 'react-icons/io';
import Button from '../../components/common/Button';
import styles from './UserInfo.scss';

const cx = classNames.bind(styles);

interface IProps {
  description: string;
  editDescription: string;
  canModify: boolean;
  isEdit: boolean;
  onChangeInput: ChangeEventHandler<HTMLTextAreaElement>;
  onToggleEdit: () => void;
  onModify: MouseEventHandler<HTMLTextAreaElement>;
}

const UserInfo = (props: IProps) => {
  const { 
    description, 
    editDescription, 
    canModify=false,
    isEdit, 
    onChangeInput, 
    onModify, 
    onToggleEdit 
  } = props;
  return (
    <div className={cx('user-info')}>
      <div className={cx('header')}>
        <IoIosPerson />
        <span>정보</span>
      </div>
      <div className={cx('content')}>
        <label className={cx('label')} htmlFor="user-info-introduction">
          내 소개
        </label>
        <div className={cx('content-item')}>
          {isEdit ? (
            <div className={cx('edit-box')}>
              <div className={cx('edit-area')}>
                <label
                  className={cx('field-name')}
                  htmlFor="user-info-introduction"
                >
                  내 소개
                </label>
                <textarea
                  className={cx('text__edit')}
                  id="user-info-introduction"
                  onChange={onChangeInput}
                  name="editDescription"
                >
                  {editDescription}
                </textarea>
              </div>
              <div className={cx('actionbar')}>
                <Button inline={true} theme="blue" onClick={onModify}>
                  변경 내용 저장
                </Button>
                <Button
                  inline={true}
                  theme="lightgray"
                  style={{ border: '1px solid gray' }}
                  onClick={onToggleEdit}
                >
                  취소
                </Button>
              </div>
            </div>
          ) : (
            <div className={cx('item__view')}>
              <pre className={cx('text')}>{description}</pre>
              {
                canModify && (<div className={cx('modify-button')} onClick={onToggleEdit}>
                  <IoMdCreate />
                  수정
                </div>)
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
