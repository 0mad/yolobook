import { storiesOf } from '@storybook/react';
import FriendItem from './FriendItem';
import FriendList from './FriendList';

storiesOf('Friend', module)
  .add('프로필 친구 목록', () => {
    const friendList = [];
    for (let i = 0; i < 30; i++) {
      friendList.push({
        thumbnail: 'http://placekitten.com/1000/1000',
        username: '문태민',
        userId: i,
        cnt: '1000',
      });
    }
    return (
      <div style={{ padding: '20px', backgroundColor: 'gray' }}>
        <FriendList friendList={friendList} />
      </div>
    );
  })
  .add('프로필 친구', () => {
    const img = 'http://placekitten.com/1000/1000';
    const name = '문태민';
    const cnt = '1000';
    return (
      <div style={{ padding: '20px', backgroundColor: 'white' }}>
        <FriendItem thumbnail={img} username={name} cnt={cnt} userId={1} />
      </div>
    );
  });
