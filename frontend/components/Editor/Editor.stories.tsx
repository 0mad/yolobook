import { storiesOf } from '@storybook/react';
import Editor from './Editor';

storiesOf('Editor', module).add('포스트 작성', () => {
  const profile = {
    id: 98,
    username: 'yolo',
    thumbnail: 'http://placekitten.com/40/40'
  }
  return (
    <div style={{ padding: '20px', backgroundColor: 'gray' }}>
      <Editor profile={profile}/>
    </div>
  )
});
