import withSizes from 'react-sizes';
import ContentLayout from '../../components/common/ContentLayout';
import PageTemplate from '../../components/common/PageTemplate';
import BannerContainer from '../../containers/BannerContainer';
import PictureContainer from '../../containers/PictureContainer';
import { mapSizesToProps } from '../../utils/withSizes';

interface IProps {
  isMobileMode: boolean;
}

const Picture = (props: IProps) => (
  <PageTemplate>
    <ContentLayout>
      <BannerContainer />
      <PictureContainer />
    </ContentLayout>
  </PageTemplate>
);

export default withSizes(mapSizesToProps)(Picture);
