import withSizes from 'react-sizes';
import ContentLayoutContainer from '../../containers/common/ContentLayoutContainer';
import PageTemplate from '../../components/common/PageTemplate';
import BannerContainer from '../../containers/BannerContainer';
import FriendContainer from '../../containers/FriendContainer';
import { mapSizesToProps } from '../../utils/withSizes';

interface IProps {
  isMobileMode: boolean;
}

const Picture = (props: IProps) => (
  <PageTemplate>
    <ContentLayoutContainer Banner={BannerContainer}>
      <FriendContainer />
    </ContentLayoutContainer>
  </PageTemplate>
);

export default withSizes(mapSizesToProps)(Picture);
