import ContentLayoutContainer from '../containers/common/ContentLayoutContainer';
import PageTemplate from '../components/common/PageTemplate';
import FollowContainer from '../containers/FollowContainer';

interface IProps {}

const Follow = (props: IProps) => (
  <PageTemplate>
    <ContentLayoutContainer>
      <FollowContainer />
    </ContentLayoutContainer>
  </PageTemplate>
);

export default Follow;
