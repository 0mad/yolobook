import { storiesOf } from '@storybook/react';
import Follow, { FollowItem } from '../Follow/Follow';

storiesOf('Follow', module)
  .add('FollowItem - 친구 요청 아이템', () => {
    const img = 'http://placekitten.com/1000/1000';
    const name = '문태민';
    return (
      <div style={{ margin: '1rem', backgroundColor: 'white' }}>
        <FollowItem img={img} name={name} id={img} type="receive" />
        <FollowItem img={img} name={name} id={img} type="send" />
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
    const requestList = names.map(name => ({
      id: name,
      img: `http://placekitten.com/${randomNum()}/${randomNum()}`,
      name,
    }));
    return (
      <div style={{ margin: '20px' }}>
        <Follow requestList={requestList} type="receive" />
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
    const requestList = names.map(name => ({
      id: name,
      img: `http://placekitten.com/${randomNum()}/${randomNum()}`,
      name,
    }));
    return (
      <div style={{ margin: '20px' }}>
        <Follow requestList={requestList} type="send" />
      </div>
    );
  });
