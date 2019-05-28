import classNames from 'classnames/bind';
import { IoIosImages } from 'react-icons/io';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import Button from '../common/Button';
import styles from './Editor.scss';

const cx = classNames.bind(styles);

interface IProps {
  isMobileMode: boolean;
}

const Editor = ({ isMobileMode }: IProps) => {
  return (
    <div className={cx('editor')}>
      <div className={cx('header')}>
        <span>{'게시물 만들기'}</span>
      </div>
      <div className={cx('content')}>
        <div className={cx('wrap-textarea')}>
          <div className={cx('profile')}>
            <img
              className={cx('profile-img')}
              src={'http://placekitten.com/40/40'}
            />
          </div>
          <textarea
            className={cx('textarea')}
            placeholder={'유주현님, 무슨 생각을 하고 계신가요?'}
          />
        </div>
        <div className={cx('more')}>
          <Button
            inline={true}
            shape={'half-circle'}
            style={{ fontSize: '12px' }}
          >
            <IoIosImages className={cx('more-icon')} />
            &nbsp; 사진
          </Button>
        </div>
      </div>
      <div className={cx('footer')}>
        <Button
          inline={isMobileMode ? false : true}
          theme={'blue'}
          style={{ fontSize: '12px' }}
        >
          게시
        </Button>
      </div>
    </div>
  );
};

export default withSizes(mapSizesToProps)(Editor);
