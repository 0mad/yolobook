import { storiesOf } from '@storybook/react';
import Follow, { FollowItem } from '../Follow/Follow';

storiesOf('Follow', module)
  .add('FollowItem - 친구 요청 아이템', () => {
    const profile = {
      thumbnail: 'http://placekitten.com/1000/1000',
      username: '문태민',
      id: 12
    }
    return (
      <div style={{ margin: '1rem', backgroundColor: 'white' }}>
        <FollowItem id={1} profile={profile} type="following" />
        <FollowItem id={2} profile={profile} type="follower" />
      </div>
    );
  })
  .add('Follow - 친구 요청 답하기', () => {
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
    const followList = names.map((username, index) => ({
      id: index,
      profile: {
        id: name,
        thumbnail: `http://placekitten.com/${randomNum()}/${randomNum()}`,
        username,
      }
    }));
    return (
      <div style={{ margin: '20px' }}>
        <Follow followList={followList} type="following" />
      </div>
    );
  })
  .add('Follow - 내가 보낸 요청', () => {
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
    const followList = names.map((username, index) => ({
      id: index,
      profile: {
        id: name,
        thumbnail: `http://placekitten.com/${randomNum()}/${randomNum()}`,
        username,
      }
    }));
    return (
      <div style={{ margin: '20px' }}>
        <Follow followList={followList} type="following" />
      </div>
    );
  });
