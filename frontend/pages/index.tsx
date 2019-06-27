import { withRouter, WithRouterProps } from 'next/router';
import ContentLayoutContainer from '../containers/common/ContentLayoutContainer';
import PageTemplate from '../components/common/PageTemplate';
import EditorContainer from '../containers/EditorContainer';
import PostContainer from '../containers/PostContainer';

interface IProps extends WithRouterProps<any> {}

const Timeline = (props: IProps) => (
  <PageTemplate>
    <ContentLayoutContainer Editor={EditorContainer}>
      <PostContainer />
    </ContentLayoutContainer>
  </PageTemplate>
);

export default withRouter(Timeline);
