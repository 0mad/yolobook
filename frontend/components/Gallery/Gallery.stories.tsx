import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Gallery from './Gallery';
import Photo from './GalleryPhoto';

const photoData = [
  {
    url:
      'https://file.mk.co.kr/meet/neds/2017/03/image_readtop_2017_198166_14902521642820611.jpg',
  },
  { url: 'http://www.economyj.co.kr/news/photo/201805/364_436_427.jpg' },
  {
    url:
      'https://img.insight.co.kr/static/2017/11/13/700/ck7g3y3gn97s3g81d1j8.jpg',
  },
  {
    url:
      'http://mimgnews2.naver.net/image/109/2016/06/16/201606151731773169_57617bdba0531_99_20160616080103.jpg?type=w540',
  },
  {
    url:
      'http://photo.newsen.com/news_photo/2019/03/10/201903100903181910_1.jpg',
  },
  { url: 'https://image.mycelebs.com/celeb/sq/2310_sq_01.jpg' },
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
