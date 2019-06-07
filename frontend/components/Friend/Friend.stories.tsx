import { storiesOf } from '@storybook/react';
import Friend from './Friend';
import FriendItem from './FriendItem';

storiesOf('Friend', module)
  .add('프로필 친구 목록', () => (
    <div style={{ padding: '20px', backgroundColor: 'gray' }}>
      <Friend />
    </div>
  ))
  .add('프로필 친구', () => {
    const img = 'http://placekitten.com/1000/1000';
    const name = '문태민';
    const cnt = '1000';
    return (
      <div style={{ padding: '20px', backgroundColor: 'white' }}>
        <FriendItem img={img} name={name} cnt={cnt} />
      </div>
    );
  });
