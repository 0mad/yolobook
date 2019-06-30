import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Post from './Post';
import PostGallery from './PostGallery';
import PostComment from './PostComment';
import PostCommentEditor from './PostCommentEditor';
import PostCommentItem from './PostCommentItem';

const galleryData = [
  {
    id: '135',
    img:
      'https://user-images.githubusercontent.com/11402468/58957574-d1441b80-87db-11e9-8d2e-411a2619188b.jpg',
  },
  {
    id: '11',
    img:
      'https://user-images.githubusercontent.com/11402468/58957575-d1441b80-87db-11e9-956b-a69266304f9b.jpg',
  },
  {
    id: '123',
    img:
      'https://user-images.githubusercontent.com/11402468/58957578-d3a67580-87db-11e9-90c5-030eb934b070.jpg',
  },
  {
    id: '112',
    img:
      'https://user-images.githubusercontent.com/11402468/58957579-d3a67580-87db-11e9-8604-0fbe32babf1c.jpg',
  },
  {
    id: '342',
    img:
      'https://user-images.githubusercontent.com/11402468/58957581-d3a67580-87db-11e9-82de-1af94c850af6.jpg',
  },
];

const handleClickPhoto = action('photo click');

storiesOf('Post', module)
  .add('Post', () => {
    const post = {
      content: `애플이 저명한 철학가를 풀타임 정규직으로 채용했다. 
      스티브 잡스의 프로젝트에 여러 영감은 전한 것으로 전해지는 조슈아 코헨이 
      최근 애플의 선임 연구원으로 정식 고용된 것이다.`,
      id: '21121',
      imgs: [
        {
          id: '1233x',
          img: 'http://placekitten.com/500/500',
        },
      ],
      user: {
        htumbnail: 'http://placekitten.com/40/40',
        username: '김유저',
        id: 233,
      },
      createdAt: '2019-06-27T06:17:21.000Z',
    };
    return (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Post post={post} />
      </div>
    );
  })
  .add('PostGallery - 1개', () => (
    <PostGallery
      images={galleryData.slice(0, 1)}
      onClickPhoto={handleClickPhoto}
      username="테스터"
    />
  ))
  .add('PostGallery - 4개', () => (
    <PostGallery
      images={galleryData.slice(0, 4)}
      onClickPhoto={handleClickPhoto}
      username="테스터"
    />
  ))
  .add('PostGallery - 5개', () => (
    <PostGallery
      images={galleryData.slice(0, 5)}
      onClickPhoto={handleClickPhoto}
      username="테스터"
    />
  ))
  .add('PostGallery - 0개', () => (
    <PostGallery
      images={galleryData.slice(0, 0)}
      onClickPhoto={handleClickPhoto}
      username="테스터"
    />
  ))
  .add('PostGallery - 10개', () => (
    <PostGallery
      images={[...galleryData.slice(0, 5), ...galleryData.slice(0, 5)]}
      onClickPhoto={handleClickPhoto}
      username="테스터"
    />
  ))
  .add('PostComment', () => {
    return (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <PostComment />
      </div>
    );
  })
  .add('PostCommentEditor', () => {
    const id = '1';
    const profile = 'http://placekitten.com/40/40';
    const handleSubmit = (value: string) => {
      console.log(value);
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <h3>댓글 달기</h3>
        <PostCommentEditor id={id} profile={profile} onSubmit={handleSubmit} />
        <br />
        <h3>댓글 달기</h3>
        <PostCommentEditor
          id={id}
          profile={profile}
          onSubmit={handleSubmit}
          reply
        />
      </div>
    );
  })
  .add('PostCommentItem', () => {
    const id = '1';
    const profile = 'http://placekitten.com/40/40';
    const username = '유주현';
    const createdAt = '2019-06-27T06:17:21.000Z';
    const content =
      '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용';
    const likeCnt = '2';

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <h3>댓글 - 좋아요가 있는 경우</h3>
        <PostCommentItem
          id={id}
          profile={profile}
          username={username}
          content={content}
          likeCnt={likeCnt}
          createdAt={createdAt}
        />
        <br />
        <h3>댓글 - 좋아요가 없는 경우</h3>
        <PostCommentItem
          id={id}
          profile={profile}
          username={username}
          content={content}
          createdAt={createdAt}
        />
        <br />
        <h3>답글</h3>
        <PostCommentItem
          id={id}
          profile={profile}
          username={username}
          content={content}
          createdAt={createdAt}
          reply
        />
      </div>
    );
  });
