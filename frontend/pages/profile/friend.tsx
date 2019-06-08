import withSizes from 'react-sizes';
import ContentLayout from '../../components/common/ContentLayout';
import PageTemplate from '../../components/common/PageTemplate';
import BannerContainer from '../../containers/BannerContainer';
import FriendContainer from '../../containers/FriendContainer';
import { mapSizesToProps } from '../../utils/withSizes';

interface IProps {
  isMobileMode: boolean;
}

const Picture = (props: IProps) => (
  <PageTemplate>
    <ContentLayout>
      <BannerContainer />
      <FriendContainer />
    </ContentLayout>
  </PageTemplate>
);

export default withSizes(mapSizesToProps)(Picture);
