import classNames from 'classnames/bind';
import * as React from 'react';
import { IoMdSearch } from 'react-icons/io';
import styles from './HeaderSearchBar.scss';

const cx = classNames.bind(styles);

export interface IProps {
  userList?: any[];
  search: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchActive: boolean;
  isMobileMode: boolean;
}

const ResultItem = ({ profile }) => {
  return (
    <li className={cx('result-item')} key={profile.id}>
      <a href={`/profile/timeline/${profile.id}`}>
        <img src={profile.thumbnail} />
        <span className={cx('username')}>{profile.username}</span>
      </a>
    </li>
  );
};

const HeaderSearchBar = (props: IProps) => {
  const { search, userList, onInputChange, isMobileMode, searchActive } = props;
  if (isMobileMode && !searchActive) {
    return <></>;
  }
  return (
    <form className={cx('searchbar', { isMobileMode })}>
      <input
        className={cx('input')}
        type="text"
        placeholder="검색"
        value={search}
        name="search"
        onChange={onInputChange}
        autoComplete="off"
      />
      {false /** 비활성 처리 */ && (
        <button className={cx('button')} onSubmit={() => {}}>
          <IoMdSearch />
        </button>
      )}
      <ul className={cx('search-result')}>
        {userList &&
          userList.map(profile => (
            <ResultItem key={profile.id} profile={profile} />
          ))}
      </ul>
    </form>
  );
};

export default HeaderSearchBar;
