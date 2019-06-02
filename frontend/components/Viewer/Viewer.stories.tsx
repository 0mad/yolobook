import { storiesOf } from '@storybook/react';
import Editor from './Viewer';

const images = [
  'http://placekitten.com/918/1024',
  'http://placekitten.com/311/500',
  'http://placekitten.com/300/560',
];

storiesOf('Viewer', module).add('미리보기', () => <Editor images={images} />);
