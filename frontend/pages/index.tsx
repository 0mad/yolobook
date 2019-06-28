import { withRouter, WithRouterProps } from 'next/router';
import PageTemplate from '../components/common/PageTemplate';
import TimelineContainer from '../containers/TimelineContainer';

interface IProps extends WithRouterProps<any> {}

const Timeline = (props: IProps) => (
  <PageTemplate>
    <TimelineContainer isTopSpace={true} />
  </PageTemplate>
);

export default withRouter(Timeline);
