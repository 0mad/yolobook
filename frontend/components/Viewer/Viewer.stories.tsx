import { storiesOf } from '@storybook/react';
import Editor from './Viewer';

const images = [
  'http://placekitten.com/1024/1024',
  'http://placekitten.com/500/500',
  'http://placekitten.com/300/300',
];

storiesOf('Viewer', module).add('미리보기', () => <Editor images={images} />);
