import classNames from 'classnames/bind';
import Link from 'next/link';
import Router from 'next/router';
import {
  IoIosContacts,
  IoIosFiling,
  IoIosLogOut,
  IoMdSearch,
} from 'react-icons/io';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../../utils/withSizes';
import Button from '../Button';
import styles from './Header.scss';
import HeaderSearchBar from './HeaderSearchBar';
import Logo from '../../../static/images/logo.png';

const cx = classNames.bind(styles);
const isBrowser = process.browser;

interface IProps {
  isLogined: boolean;
  isMobileMode: boolean;
  profile: any;
  searchText: string;
  userList: any[];
  searchActive: boolean;
  onLogout: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  onSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSearch?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

interface IToggleMenuProps {
  children: any;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

interface IUserMenuProps {
  children: any;
  href: string;
}

const ToggleMenu = (props: IToggleMenuProps) => {
  const { children, href, onClick } = props;
  return (
    <li className={cx('toggle-menu-item')} onClick={onClick}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

const UserMenu = (props: IUserMenuProps) => {
  const { children, href } = props;
  return (
    <li className={cx('user-menu-item')} onClick={() => Router.push(href)}>
      {children}
    </li>
  );
};

const LoginedHeader = (props: IProps) => {
  const {
    isMobileMode,
    profile,
    onLogout,
    searchActive,
    searchText,
    userList,
    onSearchTextChange,
    toggleSearch,
  } = props;
  return (
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
            <img className={cx('logo')} src={Logo}/>
          </Link>
          <ul className={cx('user-menu')}>
            <UserMenu href={`/profile/timeline/${profile.id}`}>
              <img className={cx('user-photo')} src={profile.thumbnail} />
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
              <ToggleMenu href={profile ? `/profile/timeline/${profile.id}` : `/`}>
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
};

const UnLoginedHeader = (props: { isMobileMode: boolean }) => {
  const { isMobileMode } = props;
  return (
    <div className={cx('unlogined-header', isMobileMode)}>
      <Link href="/">
        <img className={cx('logo')} src={Logo}/>
      </Link>
      <Link href="/login">
        <Button inline={true} style={{ height: '100%' }}>
          로그인
        </Button>
      </Link>
    </div>
  );
};

const Header = (props: IProps) => (
  <div className={cx('header-wrapper')}>
    <div className={cx('header')}>
      {isBrowser && (
        <>
          {props.isLogined ? (
            <LoginedHeader {...props} />
          ) : (
            <UnLoginedHeader isMobileMode={props.isMobileMode} />
          )}
        </>
      )}
    </div>
  </div>
);

export default withSizes(mapSizesToProps)(Header);
