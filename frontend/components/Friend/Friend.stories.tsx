import { storiesOf } from '@storybook/react';
import FriendItem from './FriendItem';
import FriendList from './FriendList';
import FriendRequest, { FriendRequestItem } from './FriendRequest';

storiesOf('Friend', module)
  .add('프로필 친구 목록', () => {
    const friendList = [];
    for (let i = 0; i < 30; i++) {
      friendList.push({
        img: 'http://placekitten.com/1000/1000',
        name: '문태민',
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
        <FriendItem img={img} name={name} cnt={cnt} />
      </div>
    );
  })
  .add('FriendRequestItem - 친구 요청 아이템', () => {
    const img = 'http://placekitten.com/1000/1000';
    const name = '문태민';
    return (
      <div style={{ margin: '1rem', backgroundColor: 'white' }}>
        <FriendRequestItem img={img} name={name} id={img} type="receive" />
        <FriendRequestItem img={img} name={name} id={img} type="send" />
      </div>
    );
  })
  .add('FriendRequest - 친구 요청 답하기', () => {
    const randomNum = () => 500 + Math.floor(Math.random() * Math.floor(100));
    const names = [
      '문태민',
      '유주현',
      'V',
      '정국',
      '지민',
      'RM',
      '진',
      '제이홉',
      '슈가',
    ];
    const requestList = names.map(name => ({
      id: name,
      img: `http://placekitten.com/${randomNum()}/${randomNum()}`,
      name,
    }));
    return (
      <div style={{ margin: '20px' }}>
        <FriendRequest requestList={requestList} type="receive" />
      </div>
    );
  })
  .add('FriendRequest - 내가 보낸 요청', () => {
    const randomNum = () => 500 + Math.floor(Math.random() * Math.floor(100));
    const names = [
      '문태민',
      '유주현',
      'V',
      '정국',
      '지민',
      'RM',
      '진',
      '제이홉',
      '슈가',
    ];
    const requestList = names.map(name => ({
      id: name,
      img: `http://placekitten.com/${randomNum()}/${randomNum()}`,
      name,
    }));
    return (
      <div style={{ margin: '20px' }}>
        <FriendRequest requestList={requestList} type="send" />
      </div>
    );
  });
