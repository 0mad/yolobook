import PageTemplate from '../../components/common/PageTemplate';
import BannerContainer from '../../containers/BannerContainer';
import TimelineContainer from '../../containers/TimelineContainer';

interface IProps {}

const Timeline = (props: IProps) => (
  <PageTemplate>
    <BannerContainer />
    <TimelineContainer />
  </PageTemplate>
);

export default Timeline;
