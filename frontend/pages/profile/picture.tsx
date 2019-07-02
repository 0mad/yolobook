import withSizes from 'react-sizes';
import PageTemplate from '../../components/common/PageTemplate';
import BannerContainer from '../../containers/BannerContainer';
import PictureContainer from '../../containers/PictureContainer';
import { mapSizesToProps } from '../../utils/withSizes';
import ViewerContainer from '../../containers/ViewerContainer';

interface IProps {
  isMobileMode: boolean;
}

const Picture = (props: IProps) => (
  <PageTemplate>
    <BannerContainer />
    <PictureContainer />
    <ViewerContainer />
  </PageTemplate>
);

export default withSizes(mapSizesToProps)(Picture);
