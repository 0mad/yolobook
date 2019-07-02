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
    const profile = {
      id: '2',
      thumbnail: 'http://placekitten.com/40/40',
    };

    const comment = {
      profile: {
        id: '1',
        thumbnail: 'http://placekitten.com/40/40',
        username: '유주현',
      },
      createdAt: '2019-06-27T06:17:21.000',
      content:
        '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용',
      likeCnt: '2',
      comments: [],
    };

    /**
     * 댓글에 value를 값으로 가진 답글을 새로 생성
     */
    const handleSubmit = ({ parent: comment, value }: any) => {
      console.group('handleSubmit');
      console.log(`comment:`);
      console.log(comment);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <h3>댓글 달기</h3>
        <PostCommentEditor
          profile={profile}
          parent={comment}
          onSubmit={handleSubmit}
        />
        <br />
        <h3>댓글 달기</h3>
        <PostCommentEditor
          profile={profile}
          parent={comment}
          onSubmit={handleSubmit}
          reply
        />
      </div>
    );
  })
  .add('PostCommentItem', () => {
    const comment = {
      profile: {
        id: '2',
        username: '유주현',
        thumbnail: 'http://placekitten.com/40/40',
      },
      id: '3',
      createdAt: '2019-06-27T06:17:21.000Z',
      content:
        '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용',
      likeCnt: '2',
      isLike: 'true',
    };

    const commentWithoutLikeCnt = {
      profile: {
        id: '2',
        username: '유주현',
        thumbnail: 'http://placekitten.com/40/40',
      },
      id: '3',
      createdAt: '2019-06-27T06:17:21.000Z',
      content:
        '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용',
      likeCnt: '0',
      isLike: 'false',
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <h3>댓글 - 좋아요가 있는 경우</h3>
        <PostCommentItem comment={comment} />
        <br />
        <h3>댓글 - 좋아요가 없는 경우</h3>
        <PostCommentItem comment={commentWithoutLikeCnt} />
        <br />
        <h3>답글</h3>
        <PostCommentItem comment={comment} reply />
      </div>
    );
  })
  .add('PostReplyComments', () => {
    const replyComments = [];
    for (let i = 0; i < 5; i++) {
      replyComments.push({
        profile: {
          id: i,
          thumbnail: 'http://placekitten.com/40/40',
          username: '유주현',
        },
        id: i.toString(),
        createdAt: '2019-06-27T06:17:21.000',
        content:
          '답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글',
        likeCnt: i.toString(),
        isLike: (i % 2 === 0).toString(),
      });
    }

    const commentHasReplyComments = {
      profile: {
        id: '1',
        thumbnail: 'http://placekitten.com/40/40',
        username: '유주현',
      },
      createdAt: '2019-06-27T06:17:21.000',
      content:
        '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용',
      likeCnt: '2',
      comments: replyComments,
    };

    const commentNotHasReplyComments = {
      profile: {
        id: '1',
        thumbnail: 'http://placekitten.com/40/40',
        username: '유주현',
      },
      createdAt: '2019-06-27T06:17:21.000',
      content:
        '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용',
      likeCnt: '2',
      comments: [],
    };

    /**
     * 답글에 좋아요 처리
     */
    const handleReplyCommentLikeToggleClick = ({
      comment: replyComment,
      isLike,
    }: any) => {
      console.group('handleReplyCommentLikeToggleClick');
      console.log(`replyComment:`);
      console.dir(replyComment);
      console.log(`isLike: ${isLike}`);
      console.groupEnd();
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <h3>답글이 있는 경우</h3>
        <PostReplyComments
          comment={commentHasReplyComments}
          onLikeToggleClick={handleReplyCommentLikeToggleClick}
        />
        <h3>답글이 없는 경우</h3>
        <PostReplyComments
          comment={commentNotHasReplyComments}
          onLikeToggleClick={handleReplyCommentLikeToggleClick}
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
          profile: {
            id: j,
            thumbnail: 'http://placekitten.com/40/40',
            username: '유주현',
          },
          id: j.toString(),
          createdAt: '2019-06-27T06:17:21.000',
          content:
            '답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글',
          likeCnt: j.toString(),
          isLike: (j % 2 === 0).toString(),
        });
      }

      comments.push({
        profile: {
          id: i.toString(),
          thumbnail: 'http://placekitten.com/40/40',
          username: '유주현',
        },
        createdAt: '2019-06-27T06:17:21.000',
        content:
          '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용',
        likeCnt: i.toString(),
        comments: replyComments,
      });
    }

    const profile = {
      id: 233,
      username: '김유저',
      thumbnail: 'http://placekitten.com/40/40',
    };

    /**
     * 댓글에 좋아요 처리
     */
    const handleCommentLikeToggleClick = ({ comment, isLike }: any) => {
      console.group('handleCommentLikeToggleClick');
      console.log(`comment:`);
      console.dir(comment);
      console.log(`isLike: ${isLike}`);
      console.groupEnd();
    };

    /**
     * 댓글에 value를 값으로 가진 답글을 새로 생성
     */
    const handleReplyCommentSubmit = ({ parent: comment, value }: any) => {
      console.group('handleReplyCommentSubmit');
      console.log(`comment:`);
      console.log(comment);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    /**
     * 답글에 좋아요 처리
     */
    const handleReplyCommentLikeToggleClick = ({
      comment: replyComment,
      isLike,
    }: any) => {
      console.group('handleReplyCommentLikeToggleClick');
      console.log(`replyComment:`);
      console.dir(replyComment);
      console.log(`isLike: ${isLike}`);
      console.groupEnd();
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <PostComments
          profile={profile}
          comments={comments}
          onCommentLikeToggleClick={handleCommentLikeToggleClick}
          onReplyCommentSubmit={handleReplyCommentSubmit}
          onReplyCommentLikeToggleClick={handleReplyCommentLikeToggleClick}
        />
      </div>
    );
  })
  .add('Post', () => {
    const comments = [];
    for (let i = 0; i < 3; i++) {
      const replyComments = [];
      for (let j = 0; j < i + 1; j++) {
        replyComments.push({
          profile: {
            id: j,
            thumbnail: 'http://placekitten.com/40/40',
            username: '유주현',
          },
          id: j.toString(),
          createdAt: '2019-06-27T06:17:21.000',
          content:
            '답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글 답글',
          likeCnt: j.toString(),
          isLike: (j % 2 === 0).toString(),
        });
      }

      comments.push({
        profile: {
          id: i.toString(),
          thumbnail: 'http://placekitten.com/40/40',
          username: '유주현',
        },
        id: i.toString(),
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
      profile: {
        thumbnail: 'http://placekitten.com/40/40',
        username: '김유저',
        id: 233,
      },
      createdAt: '2019-06-27T06:17:21.000Z',
      comments: comments,
      likeCnt: '12',
      isLike: 'false',
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
      profile: {
        thumbnail: 'http://placekitten.com/40/40',
        username: '김유저',
        id: 233,
      },
      createdAt: '2019-06-27T06:17:21.000Z',
      comments: [],
      likeCnt: '0',
      isLike: 'true',
    };

    /**
     * 포스트에 좋아요 처리
     */
    const handleLikeToggleClick = ({ post, isLike }: any) => {
      console.group('handleLikeToggleClick');
      console.log(`post:`);
      console.dir(post);
      console.log(`isLike: ${isLike}`);
      console.groupEnd();
    };

    /**
     * 포스트에 value를 값으로 가진 댓글 생성
     */
    const handleCommentSubmit = ({ parent: post, value }: any) => {
      console.group('handleCommentSubmit');
      console.log(`post:`);
      console.log(post);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    /**
     * 댓글에 좋아요 처리
     */
    const handleCommentLikeToggleClick = ({ comment, isLike }: any) => {
      console.group('handleCommentLikeToggleClick');
      console.log(`comment:`);
      console.dir(comment);
      console.log(`isLike: ${isLike}`);
      console.groupEnd();
    };

    /**
     * 댓글에 value를 값으로 가진 답글을 새로 생성
     */
    const handleReplyCommentSubmit = ({ parent: comment, value }: any) => {
      console.group('handleReplyCommentSubmit');
      console.log(`comment:`);
      console.log(comment);
      console.log(`value: ${value}`);
      console.groupEnd();
    };

    /**
     * 답글에 좋아요 처리
     */
    const handleReplyCommentLikeToggleClick = ({
      comment: replyComment,
      isLike,
    }: any) => {
      console.group('handleReplyCommentLikeToggleClick');
      console.log(`replyComment:`);
      console.dir(replyComment);
      console.log(`isLike: ${isLike}`);
      console.groupEnd();
    };

    return (
      <div
        style={{ margin: '0 auto', width: '500px', backgroundColor: '#fff' }}
      >
        <h3>댓글이 없는 포스트</h3>
        <Post
          post={postNotHasComment}
          onLikeToggleClick={handleLikeToggleClick}
          onCommentSubmit={handleCommentSubmit}
          onCommentLikeToggleClick={handleCommentLikeToggleClick}
          onReplyCommentSubmit={handleReplyCommentSubmit}
          onReplyCommentLikeToggleClick={handleReplyCommentLikeToggleClick}
        />
        <br />
        <h3>댓글이 있는 포스트</h3>
        <Post
          post={postHasComment}
          onLikeToggleClick={handleLikeToggleClick}
          onCommentSubmit={handleCommentSubmit}
          onCommentLikeToggleClick={handleCommentLikeToggleClick}
          onReplyCommentSubmit={handleReplyCommentSubmit}
          onReplyCommentLikeToggleClick={handleReplyCommentLikeToggleClick}
        />
      </div>
    );
  });
