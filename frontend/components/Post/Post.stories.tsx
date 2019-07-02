import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Post from './Post';
import PostGallery from './PostGallery';
import PostCommentEditor from './PostCommentEditor';
import PostCommentItem from './PostCommentItem';
import PostComments from './PostComments';
import PostReplyComments from './PostReplyComments';

const handleClickPhoto = action('photo click');

storiesOf('Post', module)
  .add('Post', () => {
    const comments = [];
    for (let i = 0; i < 3; i++) {
      const replyComments = [];
      for (let j = 0; j < i; j++) {
        replyComments.push({
          id: j.toString(),
          thumbnail: 'http://placekitten.com/40/40',
          username: '문태민',
          createdAt: '2019-06-27T06:17:21.000',
          content:
            '답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글',
          likeCnt: j.toString(),
        });
      }

      comments.push({
        id: i.toString(),
        thumbnail: 'http://placekitten.com/40/40',
        username: '유주현',
        createdAt: '2019-06-27T06:17:21.000',
        content:
          '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용',
        likeCnt: i.toString(),
        comments: replyComments,
      });
    }

    const postHasComment = {
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
        thumbnail: 'http://placekitten.com/40/40',
        username: '김유저',
        id: 233,
      },
      createdAt: '2019-06-27T06:17:21.000Z',
      comments: comments,
      likeCnt: '12',
    };

    const postNotHasComment = {
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
        thumbnail: 'http://placekitten.com/40/40',
        username: '김유저',
        id: 233,
      },
      createdAt: '2019-06-27T06:17:21.000Z',
      comments: [],
      likeCnt: '0',
    };

    const handleCommentSubmit = ({ targetId, value }: any) => {
      console.group('handleCommentSubmit');
      console.log(`postId: ${targetId}`);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    const handleReplyCommentSubmit = ({ targetId, value }: any) => {
      console.group('handleReplyCommentSubmit');
      console.log(`commentId: ${targetId}`);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <h3>댓글이 없는 포스트</h3>
        <Post
          post={postNotHasComment}
          onCommentSubmit={handleCommentSubmit}
          onReplyCommentSubmit={handleReplyCommentSubmit}
        />
        <br />
        <h3>댓글이 있는 포스트</h3>
        <Post
          post={postHasComment}
          onCommentSubmit={handleCommentSubmit}
          onReplyCommentSubmit={handleReplyCommentSubmit}
        />
      </div>
    );
  })
  .add('PostGallery', () => {
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

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <h3>1개</h3>
        <PostGallery
          images={galleryData.slice(0, 1)}
          onClickPhoto={handleClickPhoto}
          username="테스터"
        />
        <br />
        <h3>4개</h3>
        <PostGallery
          images={galleryData.slice(0, 4)}
          onClickPhoto={handleClickPhoto}
          username="테스터"
        />
        <br />
        <h3>5개</h3>
        <PostGallery
          images={galleryData.slice(0, 5)}
          onClickPhoto={handleClickPhoto}
          username="테스터"
        />
        <br />
        <h3>0개</h3>
        <PostGallery
          images={galleryData.slice(0, 0)}
          onClickPhoto={handleClickPhoto}
          username="테스터"
        />
        <br />
        <h3>10개</h3>
        <PostGallery
          images={[...galleryData.slice(0, 5), ...galleryData.slice(0, 5)]}
          onClickPhoto={handleClickPhoto}
          username="테스터"
        />
        <br />
      </div>
    );
  })
  .add('PostCommentEditor', () => {
    const id = '1';
    const thumbnail = 'http://placekitten.com/40/40';
    const handleSubmit = (value: string) => {
      console.log(value);
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <h3>댓글 달기</h3>
        <PostCommentEditor
          parentId={id}
          thumbnail={thumbnail}
          onSubmit={handleSubmit}
        />
        <br />
        <h3>댓글 달기</h3>
        <PostCommentEditor
          parentId={id}
          thumbnail={thumbnail}
          onSubmit={handleSubmit}
          reply
        />
      </div>
    );
  })
  .add('PostCommentItem', () => {
    const id = '1';
    const thumbnail = 'http://placekitten.com/40/40';
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
          thumbnail={thumbnail}
          username={username}
          content={content}
          likeCnt={likeCnt}
          createdAt={createdAt}
        />
        <br />
        <h3>댓글 - 좋아요가 없는 경우</h3>
        <PostCommentItem
          id={id}
          thumbnail={thumbnail}
          username={username}
          content={content}
          createdAt={createdAt}
        />
        <br />
        <h3>답글</h3>
        <PostCommentItem
          id={id}
          thumbnail={thumbnail}
          username={username}
          content={content}
          createdAt={createdAt}
          reply
        />
      </div>
    );
  })
  .add('PostReplyComments', () => {
    const commentId = '3';

    const user = {
      id: '2',
      thumbnail: 'http://placekitten.com/40/40',
    };

    const replyComments = [];
    for (let i = 0; i < 5; i++) {
      replyComments.push({
        id: i.toString(),
        thumbnail: 'http://placekitten.com/40/40',
        username: '유주현',
        createdAt: '2019-06-27T06:17:21.000',
        content:
          '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용',
        likeCnt: '2',
      });
    }

    const handleReplyCommentSubmit = ({ targetId, value }: any) => {
      console.group('handleReplyCommentSubmit');
      console.log(`commentId: ${targetId}`);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <h3>답글이 있는 경우</h3>
        <PostReplyComments
          commentId={commentId}
          replyComments={replyComments}
          user={user}
          onSubmit={handleReplyCommentSubmit}
        />
        <h3>답글이 없는 경우</h3>
        <PostReplyComments
          commentId={commentId}
          replyComments={[]}
          user={user}
          onSubmit={handleReplyCommentSubmit}
        />
      </div>
    );
  })
  .add('PostComments', () => {
    const comments = [];
    for (let i = 0; i < 3; i++) {
      const replyComments = [];
      for (let j = 0; j < i + 1; j++) {
        replyComments.push({
          id: j.toString(),
          thumbnail: 'http://placekitten.com/40/40',
          username: '문태민',
          createdAt: '2019-06-27T06:17:21.000',
          content:
            '답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글',
          likeCnt: j.toString(),
        });
      }

      comments.push({
        id: i.toString(),
        thumbnail: 'http://placekitten.com/40/40',
        username: '유주현',
        createdAt: '2019-06-27T06:17:21.000',
        content:
          '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용',
        likeCnt: '3',
        comments: replyComments,
      });
    }

    const user = {
      thumbnail: 'http://placekitten.com/40/40',
      username: '김유저',
      id: 233,
    };

    const handleCommentSubmit = ({ parentId: postId, value }: any) => {
      console.group('handleCommentSubmit');
      console.log(`postId: ${postId}`);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    const handleReplyCommentSubmit = ({ parentId: commentId, value }: any) => {
      console.group('handleReplyCommentSubmit');
      console.log(`commentId: ${commentId}`);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <PostComments
          user={user}
          comments={comments}
          onCommentSubmit={handleCommentSubmit}
          onReplyCommentSubmit={handleReplyCommentSubmit}
        />
      </div>
    );
  })
  .add('PostComments', () => {
    const comments = [];
    for (let i = 0; i < 3; i++) {
      const replyComments = [];
      for (let j = 0; j < i + 1; j++) {
        replyComments.push({
          id: j.toString(),
          thumbnail: 'http://placekitten.com/40/40',
          username: '문태민',
          createdAt: '2019-06-27T06:17:21.000',
          content:
            '답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글',
          likeCnt: '2',
        });
      }

      comments.push({
        id: i.toString(),
        thumbnail: 'http://placekitten.com/40/40',
        username: '유주현',
        createdAt: '2019-06-27T06:17:21.000',
        content:
          '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용',
        likeCnt: '3',
        comments: replyComments,
      });
    }

    const user = {
      thumbnail: 'http://placekitten.com/40/40',
      username: '김유저',
      id: 233,
    };

    const handleCommentSubmit = ({ parentId: postId, value }: any) => {
      console.group('handleCommentSubmit');
      console.log(`postId: ${postId}`);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    const handleReplyCommentSubmit = ({ parentId: commentId, value }: any) => {
      console.group('handleReplyCommentSubmit');
      console.log(`commentId: ${commentId}`);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <PostComments
          user={user}
          comments={comments}
          onCommentSubmit={handleCommentSubmit}
          onReplyCommentSubmit={handleReplyCommentSubmit}
        />
      </div>
    );
  });
