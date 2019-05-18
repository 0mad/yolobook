import classNames from 'classnames/bind';
import Footer from "../Footer";
import Header from '../Header';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

interface IPageTemplateProps {
  children: any;
}

const PageTemplate = (props: IPageTemplateProps) => {
  return (
    <div className={cx('page-template')}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default PageTemplate;