import React from 'react';
import Helmet from 'react-helmet';
import favicon from '../../../static/images/favicon.ico';

const title = 'Yolobook';
const description = 'The Yolobook is a facebook clone service!';
const image = 'https://user-images.githubusercontent.com/11402468/60762954-1abaab80-a0a5-11e9-8dc1-536a7af119b8.png';
const url = 'http://yolobook.tammolo.com';

const ogTags = {
  'og:title': title,
  'og:description': description,
  'og:image': image,
  'og:image:type': 'image/png',
  'og:url': url,
  'og:locale': 'ko_KR',
  'og:site_name': title,
  'og:image:width': 346,
  'og:image:height': 196,
}
const twitterTags = {
  'twitter:card': 'summary',
  'twitter:title': title,
  'twitter:description': description,
  'twitter:image': image,
}

const YoloHelmet = () => {
  return (
    <Helmet 
      title={`Yolobook`}
      meta={[
        ...Object.keys(ogTags).map(key => ({ property: key, content: ogTags[key] })),
        ...Object.keys(twitterTags).map(key => ({ name: key, content: twitterTags[key] })),

      ]}
      link={[
        { rel: 'shortcut icon', href: favicon }
      ]}
    />
  )
}

export default YoloHelmet;