import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './Header.scss';
import { IoIosMenu } from 'react-icons/io';

const cx = classNames.bind(styles);

const linkStyle = {
  marginRight: 15,
};

const Header = () => (
  <div className={cx('header')}>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <IoIosMenu/>
  </div>
);

export default Header;
