import classNames from 'classnames/bind';
import * as React from 'react';
import { IoMdSearch } from 'react-icons/io';
import styles from './HeaderSearchBar.scss';

const cx = classNames.bind(styles);

export interface IAppProps {}

export interface IAppState {
  value: string;
}

class HeaderSearchBar extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      value: '',
    };
  }

  public render() {
    const { value } = this.state;
    return (
      <form className={cx('searchbar')}>
        <input
          className={cx('input')}
          type="text"
          placeholder="검색"
          value={value}
          name="value"
          onChange={this.onInputChange}
        />
        <button className={cx('button')} onSubmit={() => {}}>
          <IoMdSearch />
        </button>
      </form>
    );
  }

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };
}

export default HeaderSearchBar;
