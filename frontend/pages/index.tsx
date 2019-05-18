import withSizes from 'react-sizes';
import PageTemplate from '../components/common/PageTemplate';
import { mapSizesToProps } from '../utils/withSizes';

interface IProps {
  isMobileMode: boolean;
}

const Index = (props: IProps) => (
  <PageTemplate>
    {props.isMobileMode ? <div>모바일 페이지</div> : <div>데스크탑 페이지</div>}
  </PageTemplate>
);

export default withSizes(mapSizesToProps)(Index);
