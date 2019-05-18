import classNames from 'classnames/bind';
import styles from './Footer.scss';

const cx = classNames.bind(styles);

interface IFooterProps {

}

const Footer = (props: IFooterProps) => {
    return (
      <div className={cx('footer')}>
        Footer
      </div>
    );
}

export default Footer;