import { storiesOf } from '@storybook/react';
import Friend from './Friend';
import FriendItem from './FriendItem';

storiesOf('Friend', module)
  .add('프로필 친구 목록', () => (
    <div style={{ padding: '20px', backgroundColor: 'gray' }}>
      <Friend />
    </div>
  ))
  .add('프로필 친구', () => (
    <div style={{ padding: '20px', backgroundColor: 'white' }}>
      <FriendItem />
    </div>
  ));
