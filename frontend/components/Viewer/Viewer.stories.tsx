import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import Viewer from './Viewer';

storiesOf('Viewer', module).add('미리보기', () => {
  const currentIndex = number('currentPhotoIndex', 0);
  const username = '테스트 유저'
  const images = [
    { img: 'http://placekitten.com/918/1024' },
    { img: 'http://placekitten.com/311/500' },
    { img: 'http://placekitten.com/300/560' },
  ];
  return (
    <Viewer 
      images={images} 
      currentIndex={currentIndex} 
      username={username}
    />
  )
});
