import classNames from 'classnames/bind';
import Link from 'next/link';
import {
  IoIosContacts,
  IoIosFiling,
  IoLogoFacebook,
  IoMdChatbubbles,
  IoMdMenu,
  IoMdNotifications,
  IoMdSearch,
} from 'react-icons/io';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../../utils/withSizes';
import HeaderSearchbar from '../../HeaderSearchBar';
import styles from './Header.scss';

const cx = classNames.bind(styles);

interface IProps {
  isLogined: boolean;
  isMobileMode: boolean;
}

const UnloginedHeader = () => (
  <div className={cx('unlogined-logo')}>yolobook</div>
);

const ToggleMenu = ({ children }) => (
  <li className={cx('toggle-menu')}>{children}</li>
);

const UserMenu = ({ children }) => (
  <li className={cx('user-menu')}>{children}</li>
);

const LoginedHeader = ({ isMobileMode }) => (
  <div className={cx('header')}>
    {!isMobileMode && (
      <>
        <Link href="/">
          <IoLogoFacebook className={cx('logo')} />
        </Link>
        <HeaderSearchbar />
        <ul className={cx('user-menus')}>
          <UserMenu>
            <p className={cx('user-profile')}>
              <img
                className={cx('user-photo')}
                src="https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/c7.0.24.24a/p24x24/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=1&_nc_ht=scontent-hkg3-1.xx&oh=bb72ec162290b45765c1e0bba5364a4c&oe=5D9EC7D1"
              />
              User Name
            </p>
          </UserMenu>
          <UserMenu>홈</UserMenu>
          <UserMenu>친구 찾기</UserMenu>
          <UserMenu>만들기</UserMenu>
        </ul>
      </>
    )}
    <ul className={cx('toggle-menus')}>
      {isMobileMode && (
        <ToggleMenu>
          <IoIosFiling />
        </ToggleMenu>
      )}
      <ToggleMenu>
        <IoIosContacts />
      </ToggleMenu>
      <ToggleMenu>
        <IoMdChatbubbles />
      </ToggleMenu>
      <ToggleMenu>
        <IoMdNotifications />
      </ToggleMenu>
      <ToggleMenu>
        <IoMdSearch />
      </ToggleMenu>
      <ToggleMenu>
        <IoMdMenu />
      </ToggleMenu>
    </ul>
  </div>
);

const Header = ({ isLogined, isMobileMode }: IProps) => (
  <div className={cx('header-wrapper', { isUnlogined: !isLogined })}>
    {isLogined ? (
      <LoginedHeader isMobileMode={isMobileMode} />
    ) : (
      <UnloginedHeader />
    )}
  </div>
);

export default withSizes(mapSizesToProps)(Header);
