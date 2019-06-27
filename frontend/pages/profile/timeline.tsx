import ContentLayoutContainer from '../../containers/common/ContentLayoutContainer';
import PageTemplate from '../../components/common/PageTemplate';
import BannerContainer from '../../containers/BannerContainer';
import EditorContainer from '../../containers/EditorContainer';
import PostContainer from '../../containers/PostContainer';

interface IProps {}

const Timeline = (props: IProps) => (
  <PageTemplate>
    <ContentLayoutContainer Banner={BannerContainer} Editor={EditorContainer}>
      <PostContainer />
    </ContentLayoutContainer>
  </PageTemplate>
);

export default Timeline;
