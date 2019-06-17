import classNames from 'classnames/bind';
import { IoIosImages } from 'react-icons/io';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import Button from '../common/Button';
import styles from './Editor.scss';

const cx = classNames.bind(styles);
const isBrowser = process.browser;

interface IProps {
  isMobileMode: boolean;
  onTextChange: void;
  onImgsChange: void;
  onSubmit: void;
  content: any;
  profile: any;
}

const Editor = ({
  isMobileMode,
  onTextChange,
  onImgsChange,
  onSubmit,
  content,
  profile,
}: IProps) => {
  let uploadImgEl: any;

  const handleClickUploadImgsBtn = (event: any) => {
    event.preventDefault();
    uploadImgEl.click();
  };

  return (
    <div className={cx('editor')}>
      <div className={cx('header')}>
        <span>{'게시물 만들기'}</span>
      </div>
      <div className={cx('content')}>
        <div className={cx('wrap-textarea')}>
          <div className={cx('profile')}>
            <img className={cx('profile-img')} src={profile.thumbnail} />
          </div>
          <textarea
            className={cx('textarea')}
            placeholder={`${profile.username}님, 무슨 생각을 하고 계신가요?`}
            value={content}
            onChange={onTextChange}
          />
        </div>
        <div className={cx('more')}>
          <div className={cx('wrap-upload-imgs-btn')}>
            <input
              className={cx('upload-imgs-input')}
              ref={ref => {
                uploadImgEl = ref;
              }}
              type="file"
              multiple
              name="files"
              accept="image/*"
              onChange={onImgsChange}
            />
            <Button
              inline={true}
              shape={'half-circle'}
              style={{ fontSize: '12px' }}
              onClick={handleClickUploadImgsBtn}
            >
              <IoIosImages className={cx('more-icon')} />
              &nbsp; 사진
            </Button>
          </div>
        </div>
      </div>
      <div className={cx('footer')}>
        {isBrowser && (
          <Button
            inline={isMobileMode ? false : true}
            theme={'blue'}
            style={{ fontSize: '12px' }}
            onClick={onSubmit}
          >
            게시
          </Button>
        )}
      </div>
    </div>
  );
};

export default withSizes(mapSizesToProps)(Editor);
