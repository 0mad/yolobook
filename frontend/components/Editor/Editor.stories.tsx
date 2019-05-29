import { storiesOf } from '@storybook/react';
import Editor from './Editor';

storiesOf('Editor', module).add('포스트 작성', () => (
  <div style={{ padding: '20px', backgroundColor: 'gray' }}>
    <Editor />
  </div>
));
