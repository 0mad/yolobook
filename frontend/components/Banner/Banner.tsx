import classNames from 'classnames/bind';
import Link from 'next/link';
import { IoIosCamera, IoIosPersonAdd } from 'react-icons/io';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/withSizes';
import Button from '../common/Button';
import styles from './Banner.scss';

const cx = classNames.bind(styles);

interface IProps {
  isMobileMode: boolean;
  backgroundImage: string;
  profileImage: string;
  username: string;
  isMyProfile: boolean;
  onClickFollow?: void;
  onCoverImgsChange?: void;
  onThumbnailImgsChange?: void;
}

const Banner = ({
  isMobileMode,
  backgroundImage,
  profileImage,
  username,
  isMyProfile,
  onClickFollow,
  onCoverImgsChange,
  onThumbnailImgsChange,
}: IProps) => {
  let cameraEl: any;
  let profileEl: any;
  let uploadCoverImgEl: any;
  let uploadThumbnailImgEl: any;

  const handleBannerMouseOver = () => {
    if (isMobileMode) return;
    !!cameraEl && cameraEl.classList.add(cx('background-edit-hover'));
  };

  const handleBannerMouseOut = () => {
    if (isMobileMode) return;
    !!cameraEl && cameraEl.classList.remove(cx('background-edit-hover'));
  };

  const handleProfileMouseEnter = () => {
    if (isMobileMode) return;
    !!profileEl && profileEl.classList.add(cx('profile-edit-show'));
  };

  const handleProfileMouseLeave = () => {
    if (isMobileMode) return;
    !!profileEl && profileEl.classList.remove(cx('profile-edit-show'));
  };

  const handleCameraClick = () => {
    uploadCoverImgEl.click();
  };

  const handleThumbnailClick = () => {
    uploadThumbnailImgEl.click();
  };

  return (
    <div
      className={cx('banner')}
      onMouseOver={handleBannerMouseOver}
      onMouseOut={handleBannerMouseOut}
    >
      <div className={cx('background')}>
        {isMyProfile && (
          <div
            ref={ref => {
              cameraEl = ref;
            }}
            className={cx('background-edit')}
            onClick={handleCameraClick}
          >
            <input
              className={cx('upload-img-input')}
              ref={ref => {
                uploadCoverImgEl = ref;
              }}
              type="file"
              accept="image/*"
              onChange={onCoverImgsChange}
            />
            <IoIosCamera />
            <div className={cx('background-edit-content')}>
              <span>{isMobileMode ? '수정' : '커버 사진 업데이트'}</span>
            </div>
          </div>
        )}
        <img src={backgroundImage} />
      </div>
      <div
        className={cx('profile')}
        onMouseEnter={handleProfileMouseEnter}
        onMouseLeave={handleProfileMouseLeave}
      >
        <div className={cx('wrap-profile-edit')}>
          <img src={profileImage} />
          {isMyProfile && (
            <div
              ref={ref => {
                profileEl = ref;
              }}
              className={cx('profile-edit')}
              onClick={handleThumbnailClick}
            >
              <div className={cx('profile-edit-content')}>
                <input
                  className={cx('upload-img-input')}
                  ref={ref => {
                    uploadThumbnailImgEl = ref;
                  }}
                  type="file"
                  accept="image/*"
                  onChange={onThumbnailImgsChange}
                />
                <IoIosCamera />
                <div className={cx('profile-edit-text')}>
                  <span>{isMobileMode ? '수정' : '업데이트'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={cx('username')}>
        <h1>{username}</h1>
      </div>
      {!isMyProfile && (
        <div className={cx('follow-button')}>
          <Button inline onClick={onClickFollow}>
            <IoIosPersonAdd />
            <span>친구 추가</span>
          </Button>
        </div>
      )}
      {!isMobileMode && (
        <nav className={cx('nav')}>
          <ul>
            <li>
              <Link href={'/profile/timeline/abc'}>타임라인</Link>
            </li>
            <li>
              <Link href={'/profile/info'}>정보</Link>
            </li>
            <li>
              <Link href={'/profile/friend'}>친구</Link>
            </li>
            <li>
              <Link href={'/profile/picture'}>사진</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default withSizes(mapSizesToProps)(Banner);
