import classNames from 'classnames/bind';
import { IoIosCamera } from 'react-icons/io';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import styles from './Banner.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

interface IProps {
  isMobileMode: boolean;
  backgroundImage: string;
  profileImage: string;
  username: string;
}

const Banner = ({
  isMobileMode,
  backgroundImage,
  profileImage,
  username,
}: IProps) => {
  const handleBannerMouseOver = () => {
    if (isMobileMode) return;
    const cameraEl = document.querySelector('.background-edit');
    cameraEl.classList.add(cx('background-edit-hover'));
  };

  const handleBannerMouseOut = () => {
    if (isMobileMode) return;
    const cameraEl = document.querySelector('.background-edit');
    cameraEl.classList.remove(cx('background-edit-hover'));
  };

  const handleProfileMouseEnter = () => {
    if (isMobileMode) return;
    const profileEl = document.querySelector('.profile-edit');
    profileEl.classList.add(cx('profile-edit-show'));
  };

  const handleProfileMouseLeave = () => {
    if (isMobileMode) return;
    const profileEl = document.querySelector('.profile-edit');
    profileEl.classList.remove(cx('profile-edit-show'));
  };

  return (
    <div
      className={cx('banner')}
      onMouseOver={handleBannerMouseOver}
      onMouseOut={handleBannerMouseOut}
    >
      <div className={cx('background')}>
        <div className={cx('background-edit')}>
          <IoIosCamera />
          <div className={cx('background-edit-content')}>
            <span>{isMobileMode ? '수정' : '커버 사진 업데이트'}</span>
          </div>
        </div>
        <img src={backgroundImage} />
      </div>
      <div
        className={cx('profile')}
        onMouseEnter={handleProfileMouseEnter}
        onMouseLeave={handleProfileMouseLeave}
      >
        <div className={cx('wrap-profile-edit')}>
          <img src={profileImage} />
          <div className={cx('profile-edit')}>
            <div className={cx('profile-edit-content')}>
              <IoIosCamera />
              <div className={cx('profile-edit-text')}>
                <span>{isMobileMode ? '수정' : '업데이트'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('username')}>
        <h1>{username}</h1>
      </div>
      {!isMobileMode && (
        <nav className={cx('nav')}>
          <ul>
            <li>
              <Link href={'/'}>타임라인</Link>
            </li>
            <li>
              <Link href={'/'}>정보</Link>
            </li>
            <li>
              <Link href={'/'}>친구</Link>
            </li>
            <li>
              <Link href={'/'}>사진</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default withSizes(mapSizesToProps)(Banner);
