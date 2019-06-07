import withSizes from 'react-sizes';
import ContentLayout from '../../components/common/ContentLayout';
import PageTemplate from '../../components/common/PageTemplate';
import BannerContainer from '../../containers/BannerContainer';
import UserInfoContainer from '../../containers/UserInfoContainer';
import { mapSizesToProps } from '../../utils/withSizes';

interface IProps {
  isMobileMode: boolean;
}

const Info = (props: IProps) => (
  <PageTemplate>
    <ContentLayout>
      <BannerContainer />
      <UserInfoContainer />
    </ContentLayout>
  </PageTemplate>
);

export default withSizes(mapSizesToProps)(Info);
