import { storiesOf } from '@storybook/react';
import PostWrapper from './PostWrapper';

storiesOf('PostWrapper', module).add('포스트 래퍼', () => {
  const user = {
    profile: 'http://placekitten.com/40/40',
  };
  const posts = [
    {
      commentData: [],
      content: `애플이 저명한 철학가를 풀타임 정규직으로 채용했다. 
      sdff
      sdfsdf
      sdfsf
      스티브 잡스의 프로젝트에 여러 영감은 전한 것으로 전해지는 조슈아 코헨이 
      최근 애플의 선임 연구원으로 정식 고용된 것이다.`,
      id: '21121',
      images: [
        {
          id: 'lkjoixjxs',
          url:
            'https://user-images.githubusercontent.com/11402468/58957574-d1441b80-87db-11e9-8d2e-411a2619188b.jpg',
        },
        {
          id: 'lkjoixjxs',
          url:
            'https://user-images.githubusercontent.com/11402468/58957575-d1441b80-87db-11e9-956b-a69266304f9b.jpg',
        },
      ],
    },
    {
      commentData: [
        {
          author: {
            fullName: 'tmmoond8',
            profile: 'http://placekitten.com/40/40',
          },
          content: '예쁘게 잘 만들었네!',
          like: 3,
          replys: [
            {
              author: {
                fullName: 'tmmoond8',
                profile: 'http://placekitten.com/41/40',
              },
              content: '굿굿!',
              like: 3,
            },
          ],
        },
      ],
      content: `애플이 저명한 철학가를 풀타임 정규직으로 채용했다. 
      sdff
      sdfsdf
      sdfsf
      스티브 잡스의 프로젝트에 여러 영감은 전한 것으로 전해지는 조슈아 코헨이 
      최근 애플의 선임 연구원으로 정식 고용된 것이다.`,
      id: '21121',
      images: [
        {
          id: 'djfos',
          url:
            'https://user-images.githubusercontent.com/11402468/58957575-d1441b80-87db-11e9-956b-a69266304f9b.jpg',
        },
      ],
    },
  ];
  return (
    <div
      style={{
        backgroundColor: 'lightgrey',
        margin: '0 auto',
        maxWidth: '53rem',
        width: '100%',
      }}
    >
      <PostWrapper posts={posts} user={user} />
    </div>
  );
});
