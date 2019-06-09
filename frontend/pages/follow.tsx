import ContentLayout from '../components/common/ContentLayout';
import PageTemplate from '../components/common/PageTemplate';
import FollowContainer from '../containers/FollowContainer';

interface IProps {}

const Follow = (props: IProps) => (
  <PageTemplate>
    <ContentLayout>
      <FollowContainer />
    </ContentLayout>
  </PageTemplate>
);

export default Follow;
