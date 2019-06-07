import { storiesOf } from '@storybook/react';
import Post from './Post';
import PostGallery from './PostGallery';

const galleryData = [
  {
    id: '135',
    url:
      'https://user-images.githubusercontent.com/11402468/58957574-d1441b80-87db-11e9-8d2e-411a2619188b.jpg',
  },
  {
    id: '11',
    url:
      'https://user-images.githubusercontent.com/11402468/58957575-d1441b80-87db-11e9-956b-a69266304f9b.jpg',
  },
  {
    id: '123',
    url:
      'https://user-images.githubusercontent.com/11402468/58957578-d3a67580-87db-11e9-90c5-030eb934b070.jpg',
  },
  {
    id: '112',
    url:
      'https://user-images.githubusercontent.com/11402468/58957579-d3a67580-87db-11e9-8604-0fbe32babf1c.jpg',
  },
  {
    id: '342',
    url:
      'https://user-images.githubusercontent.com/11402468/58957581-d3a67580-87db-11e9-82de-1af94c850af6.jpg',
  },
];

const post = {
  content: `애플이 저명한 철학가를 풀타임 정규직으로 채용했다. 
  sdff
  sdfsdf
  sdfsf
  스티브 잡스의 프로젝트에 여러 영감은 전한 것으로 전해지는 조슈아 코헨이 
  최근 애플의 선임 연구원으로 정식 고용된 것이다.`,
  id: '21121',
  images: [
    {
      id: '1233x',
      url:
        'http://rockinkorea.co.kr/files/attach/images/256/997/001/e0be98d70123229c8a08b643fd17b489.jpg',
    },
  ],
};

storiesOf('Post', module)
  .add('포스트', () => (
    <div style={{ margin: '1rem' }}>
      <Post post={post} />
    </div>
  ))
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
