import { withRouter, WithRouterProps } from 'next/router';
import ContentLayout from '../components/common/ContentLayout';
import PageTemplate from '../components/common/PageTemplate';
import EditorContainer from '../containers/EditorContainer';
import PostContainer from '../containers/PostContainer';

interface IProps extends WithRouterProps<any> {}

const Timeline = (props: IProps) => (
  <PageTemplate>
    <ContentLayout>
      <EditorContainer />
      <PostContainer />
    </ContentLayout>
  </PageTemplate>
);

export default withRouter(Timeline);
