import { storiesOf } from '@storybook/react';
import Post from './Post';
import PostGallery from './PostGallery';

const galleryData = [
  {
    url:
      'http://rockinkorea.co.kr/files/attach/images/256/997/001/e0be98d70123229c8a08b643fd17b489.jpg',
    key: '135',
  },
  {
    url:
      'http://rockinkorea.co.kr/files/attach/images/256/997/001/e0be98d70123229c8a08b643fd17b489.jpg',
    key: '11',
  },
  {
    url:
      'http://rockinkorea.co.kr/files/attach/images/256/997/001/e0be98d70123229c8a08b643fd17b489.jpg',
    key: '123',
  },
  {
    url:
      'http://rockinkorea.co.kr/files/attach/images/256/997/001/e0be98d70123229c8a08b643fd17b489.jpg',
    key: '112',
  },
  {
    url:
      'http://rockinkorea.co.kr/files/attach/images/256/997/001/e0be98d70123229c8a08b643fd17b489.jpg',
    key: '342',
  },
];

const post = {
  content: `애플이 저명한 철학가를 풀타임 정규직으로 채용했다. 
  sdff
  sdfsdf
  sdfsf
  스티브 잡스의 프로젝트에 여러 영감은 전한 것으로 전해지는 조슈아 코헨이 
  최근 애플의 선임 연구원으로 정식 고용된 것이다.`,
  url:
    'http://rockinkorea.co.kr/files/attach/images/256/997/001/e0be98d70123229c8a08b643fd17b489.jpg',
  key: '21121',
};

storiesOf('Post', module)
  .add('포스트', () => <Post post={post} />)
  .add('PostGallery - 1개', () => (
    <PostGallery photoList={galleryData.slice(0, 1)} />
  ))
  .add('PostGallery - 4개', () => (
    <PostGallery photoList={galleryData.slice(0, 4)} />
  ))
  .add('PostGallery - 5개', () => (
    <PostGallery photoList={galleryData.slice(0, 5)} />
  ))
  .add('PostGallery - 0개', () => (
    <PostGallery photoList={galleryData.slice(0, 0)} />
  ));
