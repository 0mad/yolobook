import classNames from 'classnames/bind';
import Link from 'next/link';
import { IoIosMenu } from 'react-icons/io';
import styles from './Header.scss';

const cx = classNames.bind(styles);

interface IHeaderProps {

}

const Header = (props: IHeaderProps) => {
  return (
    <div className={cx('header')}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <IoIosMenu/>
    </div>
  );
}

export default Header;