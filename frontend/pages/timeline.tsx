import ContentLayout from '../components/common/ContentLayout';
import PageTemplate from '../components/common/PageTemplate';
import BannerContainer from '../containers/BannerContainer';
import EditorContainer from '../containers/EditorContainer';
import PostContainer from '../containers/PostContainer';

interface IProps {}

const Timeline = (props: IProps) => (
  <PageTemplate>
    <ContentLayout>
      <BannerContainer />
      <EditorContainer />
      <PostContainer />
    </ContentLayout>
  </PageTemplate>
);

export default Timeline;
