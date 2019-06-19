import React, { Component } from 'react';
import Gallery from '../components/Gallery';

interface IProps {}

class UserInfoContainer extends Component<IProps> {
  public render() {
    const photoData = [
      {
        url:
          'https://user-images.githubusercontent.com/11402468/58957574-d1441b80-87db-11e9-8d2e-411a2619188b.jpg',
      },
      {
        url:
          'https://user-images.githubusercontent.com/11402468/58957575-d1441b80-87db-11e9-956b-a69266304f9b.jpg',
      },
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
      {
        url:
          'https://user-images.githubusercontent.com/11402468/58957582-d43f0c00-87db-11e9-92db-b4037d423b88.jpg',
      },
    ];

    return <Gallery album={{ photoList: photoData }} />;
  }
}

export default UserInfoContainer;
