import classNames from 'classnames/bind';
import Footer from "../Footer";
import Header from '../Header';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

interface IProps {
  children: any;
}

const PageTemplate = (props: IProps) => {
  return (
    <div className={cx('page-template')}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default PageTemplate;