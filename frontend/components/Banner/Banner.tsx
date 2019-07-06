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
  onClickAcceptFollow?: void;
  onClickRejectFollow?: void;
  onClickCancelFollow?: void;
  onCoverImgsChange?: void;
  onThumbnailImgsChange?: void;
  userId: number;
  friendShip: 'NOTHING' | 'FOLLOWING' | 'FOLLOWER' | 'ACCEPTED';
}

const Banner = ({
  isMobileMode,
  backgroundImage,
  profileImage,
  username,
  isMyProfile,
  onClickFollow,
  onClickAcceptFollow,
  onClickRejectFollow,
  onClickCancelFollow,
  onCoverImgsChange,
  onThumbnailImgsChange,
  userId,
  friendShip,
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

  const renderFriendShipButton = (
    friendShip: 'NOTHING' | 'FOLLOWING' | 'FOLLOWER' | 'ACCEPTED'
  ) => {
    const defaultButtonObj = {
      onClick: () => null,
      text: '',
      disable: false,
    };
    let buttonMetaObj = {};

    if (userId === -1 || isMyProfile || friendShip === 'REJECTED') {
      return false;
    } else if (friendShip === 'NOTHING') {
      buttonMetaObj = {
        onClick: onClickFollow,
        text: '친구 추가',
      };
    } else if (friendShip === 'ACCEPTED') {
      buttonMetaObj = {
        disable: true,
        text: '친구',
      };
    } else if (friendShip === 'FOLLOWER') {
      buttonMetaObj = {
        onClick: onClickAcceptFollow,
        text: '친구 승인',
      };
    } else if (friendShip === 'FOLLOWING') {
      buttonMetaObj = {
        onClick: onClickCancelFollow,
        text: '친구 요청 취소',
      };
    }
    buttonMetaObj = {
      ...defaultButtonObj,
      ...buttonMetaObj,
    };
    return (
      <>
        <div className={cx('friendship-button')}>
          <Button
            inline
            disabled={buttonMetaObj.disable}
            onClick={buttonMetaObj.onClick}
            href={buttonMetaObj.href}
          >
            <IoIosPersonAdd />
            <span>{buttonMetaObj.text}</span>
          </Button>
        </div>
        {friendShip === 'FOLLOWER' && (
          <div className={cx('friendship-reject-button')}>
            <Button
              inline
              theme="pink"
              onClick={onClickRejectFollow}
              style={{ height: '38px' }}
            >
              <span>친구 거절</span>
            </Button>
          </div>
        )}
      </>
    );
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
        <img
          src={
            backgroundImage ||
            'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
          }
        />
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
      {renderFriendShipButton(friendShip)}
      {!isMobileMode && (
        <nav className={cx('nav')}>
          <ul>
            <li>
              <Link href={`/profile/timeline/${userId}`}>
                <a>타임라인</a>
              </Link>
            </li>
            <li>
              <Link href={`/profile/info/${userId}`}>
                <a>정보</a>
              </Link>
            </li>
            <li>
              <Link href={`/profile/friend/${userId}`}>
                <a>친구</a>
              </Link>
            </li>
            <li>
              <Link href={`/profile/picture/${userId}`}>
                <a>사진</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default withSizes(mapSizesToProps)(Banner);
