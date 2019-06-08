import classNames from 'classnames/bind';
import { IoIosPeople, IoIosSearch } from 'react-icons/io';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import styles from './Friend.scss';
import FriendItem from './FriendItem';

const cx = classNames.bind(styles);

export interface IProps {
  isMobileMode: boolean;
  friendList: any;
}

const DesktopHeader = () => (
  <div className={cx('header')}>
    <div className={cx('title')}>
      <IoIosPeople />
      <span>친구</span>
    </div>
    <div className={cx('search-bar')}>
      <input placeholder={'친구 검색'} />
      <div className={cx('search-btn')}>
        <IoIosSearch />
      </div>
    </div>
  </div>
);

const MobileHeader = () => (
  <div className={cx('header')}>
    <div className={cx('title')}>
      <h3>친구</h3>
    </div>
  </div>
);

const Friend = ({ isMobileMode, friendList }: IProps) => {
  return (
    <div className={cx('friend')}>
      {isMobileMode ? <MobileHeader /> : <DesktopHeader />}
      <ul className={cx('list')}>
        {friendList.map(
          (
            data: { img: string; name: string; cnt: string },
            index: string | number | undefined
          ) => (
            <li key={index} className={cx('item')}>
              <FriendItem img={data.img} name={data.name} cnt={data.cnt} />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default withSizes(mapSizesToProps)(Friend);
