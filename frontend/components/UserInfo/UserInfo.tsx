import classNames from 'classnames/bind';
import { IoIosPerson, IoMdCreate } from 'react-icons/io';
import Button from '../../components/common/Button';
import styles from './UserInfo.scss';

const cx = classNames.bind(styles);

interface IProps {
  introduction: string;
  isEdit: boolean;
}

const UserInfo = (props: IProps) => {
  const { introduction, isEdit } = props;
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
                >
                  {introduction}
                </textarea>
              </div>
              <div className={cx('actionbar')}>
                <Button inline={true} theme="blue">
                  변경 내용 저장
                </Button>
                <Button
                  inline={true}
                  theme="lightgray"
                  style={{ border: '1px solid gray' }}
                >
                  취소
                </Button>
              </div>
            </div>
          ) : (
            <div className={cx('item__view')}>
              <pre className={cx('text')}>{introduction}</pre>
              <div className={cx('modify-button')}>
                <IoMdCreate />
                수정
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
