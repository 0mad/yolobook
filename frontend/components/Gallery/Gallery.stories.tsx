import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Gallery from './Gallery';
import Photo from './GalleryPhoto';

const photoData = [
  {
    url:
      'https://user-images.githubusercontent.com/11402468/58957574-d1441b80-87db-11e9-8d2e-411a2619188b.jpg',
  },
  { url: 'https://user-images.githubusercontent.com/11402468/58957575-d1441b80-87db-11e9-956b-a69266304f9b.jpg' },
  {
    url:
      'https://user-images.githubusercontent.com/11402468/58957578-d3a67580-87db-11e9-90c5-030eb934b070.jpg',
  },
  {
    url:
      'https://user-images.githubusercontent.com/11402468/58957579-d3a67580-87db-11e9-8604-0fbe32babf1c.jpg',
  },
  {
    url:
      'https://user-images.githubusercontent.com/11402468/58957581-d3a67580-87db-11e9-82de-1af94c850af6.jpg',
  },
  { url: 'https://user-images.githubusercontent.com/11402468/58957582-d43f0c00-87db-11e9-92db-b4037d423b88.jpg' },
];
const photoWrapperStyle = {
  display: 'inline-block',
  height: '12rem',
  margin: '20px',
  width: '12rem',
};

const handleClickPhoto = action('click photo');
const handleClickLike = action('click like');
const handleClickComment = action('click comment');

storiesOf('Gallery', module)
  .add('Gallery', () => (
    <div style={{ padding: '20px' }}>
      <Gallery album={{ photoList: photoData }} />
    </div>
  ))
  .add('Photo - 사진', () => (
    <>
      {photoData.map((photo, index) => (
        <div style={photoWrapperStyle} key={index}>
          <Photo
            photo={photo}
            onClickPhoto={handleClickPhoto}
            onClickLike={handleClickLike}
            onClickComment={handleClickComment}
          />
        </div>
      ))}
    </>
  ));
