import { storiesOf } from '@storybook/react';
import Banner from './Banner';

const backgroundImage = 'http://placekitten.com/1000/1000';
const profileImage = 'http://placekitten.com/200/200';
const username = '유주현';

storiesOf('Banner', module).add('나의 배너', () => (
  <div style={{ padding: '20px', backgroundColor: 'gray' }}>
    <Banner
      backgroundImage={backgroundImage}
      profileImage={profileImage}
      username={username}
    />
  </div>
));
