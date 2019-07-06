import { storiesOf } from '@storybook/react';
import Editor from './Editor';

storiesOf('Editor', module).add('포스트 작성', () => {
  const profile = {
    id: 98,
    username: 'yolo',
    thumbnail: 'http://placekitten.com/40/40',
  };

  const imgUrls: Array<object> = [];
  for (let i = 0; i < 10; i++) {
    imgUrls.push({ url: 'http://placekitten.com/500/300' });
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>이미지 업로드가 안된 경우</h3>
      <Editor profile={profile} />
      <br />
      <h3>이미지 업로드가 된 경우</h3>
      <Editor profile={profile} imgUrls={imgUrls} />
    </div>
  );
});
