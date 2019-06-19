import classNames from 'classnames/bind';
import Link from 'next/link';
import Router from 'next/router';
import {
  IoIosContacts,
  IoIosFiling,
  IoIosLogOut,
  IoLogoFacebook,
  IoMdSearch,
} from 'react-icons/io';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../../utils/withSizes';
import Button from '../Button';
import styles from './Header.scss';
import HeaderSearchBar from './HeaderSearchBar';

const cx = classNames.bind(styles);
const isBrowser = process.browser;

interface IProps {
  isLogined: boolean;
  isMobileMode: boolean;
  profile: any;
  onLogout: void;
  searchText: string;
  userList: any[];
  onSearchTextChange: void;
  searchActive: boolean;
  toggleSearch?: void;
}

const ToggleMenu = ({ children, href, onClick }) => (
  <li className={cx('toggle-menu-item')} onClick={onClick}>
    <Link href={href}>{children}</Link>
  </li>
);

const UserMenu = ({ children, href }) => (
  <li className={cx('user-menu-item')} onClick={() => Router.push(href)}>
    {children}
  </li>
);

const LoginedHeader = ({ 
  isMobileMode, 
  profile, 
  onLogout, 
  searchActive, 
  searchText, 
  userList, 
  onSearchTextChange, 
  toggleSearch,
}) => (
  <>
    <HeaderSearchBar 
      isMobileMode={isMobileMode} 
      searchActive={searchActive} 
      search={searchText} 
      userList={userList} 
      onInputChange={onSearchTextChange}
    />
    {!isMobileMode && (
      <>
        <Link href="/">
          <IoLogoFacebook className={cx('logo')} />
        </Link>
        <ul className={cx('user-menu')}>
          <UserMenu href="/profile/timeline">
            <img
              className={cx('user-photo')}
              src={profile.thumbnail || "https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/c7.0.24.24a/p24x24/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=1&_nc_ht=scontent-hkg3-1.xx&oh=bb72ec162290b45765c1e0bba5364a4c&oe=5D9EC7D1"}
            />
            <p className={cx('user-name')}>{profile.username}</p>
          </UserMenu>
        </ul>
      </>
    )}
    {
      <ul className={cx('toggle-menu')}>
        <ToggleMenu onClick={onLogout}>
          <IoIosLogOut />
        </ToggleMenu>
        {isMobileMode && (
          <>
            <ToggleMenu>
              <IoIosFiling />
            </ToggleMenu>
            <ToggleMenu onClick={toggleSearch}>
              <IoMdSearch />
            </ToggleMenu>
          </>
        )}
        <ToggleMenu href="/follow/follower">
          <IoIosContacts />
        </ToggleMenu>
      </ul>
    }
  </>
);

const UnLoginedHeader = ({ isMobileMode }) => (
  <div className={cx('unlogined-header', isMobileMode)}>
    <Link href="/">
      <IoLogoFacebook className={cx('logo')} />
    </Link>
    <Link href="/login">
      <Button inline={true} style={{ height: '100%' }}>
        로그인
      </Button>
    </Link>
  </div>
);

const Header = (props: IProps) => (
  <div className={cx('header-wrapper')}>
    <div className={cx('header')}>
      {isBrowser && (
        <>
          {props.isLogined ? (
            <LoginedHeader {...props}/>
          ) : (
            <UnLoginedHeader isMobileMode={props.isMobileMode} />
          )}
        </>
      )}
    </div>
  </div>
);

export default withSizes(mapSizesToProps)(Header);
