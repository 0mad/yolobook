import classNames from 'classnames/bind';
import styles from './Footer.scss';

const cx = classNames.bind(styles);

interface IProps {}

const Footer = (props: IProps) => {
  return <div className={cx('footer')}>Footer</div>;
};

export default Footer;
