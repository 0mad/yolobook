import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Comment from './Comment';
import CommentEditor from './CommentEditor';
import CommentItem from './CommentItem';

const Wrapper = ({ children, style = {} }) => (
  <div style={{ display: 'block', ...style }}>{children}</div>
);

const stories = storiesOf('Comment', module);

const handleClickLike = action('💜');
const handleClickReply = action('reply');

stories
  .add('CommentItem - 댓글, 답글 아이템', () => {
    const authorName = text('Author Name', 'tammoond8');
    const content = text(
      'Comment Content',
      '바우처로 도쿄서브웨이패스 교환은 나리타공항만 되는걸로 알고있'
    );
    const comment = {
      author: {
        fullName: authorName,
        profile: 'http://placekitten.com/40/40',
      },
      content,
      like: 3,
    };
    return (
      <Wrapper>
        <CommentItem
          comment={comment}
          onClickLike={handleClickLike}
          onClickReply={handleClickReply}
        />
        <CommentItem
          comment={comment}
          reply={true}
          onClickLike={handleClickLike}
          onClickReply={handleClickReply}
        />
        <CommentItem
          comment={comment}
          reply={true}
          onClickLike={handleClickLike}
          onClickReply={handleClickReply}
        />
      </Wrapper>
    );
  })
  .add('CommentEditor - 댓글, 답글 작성', () => {
    const user = {
      profile: 'http://placekitten.com/40/40',
    };
    return (
      <Wrapper>
        <CommentEditor user={user} />
        <CommentEditor user={user} reply={true} />
      </Wrapper>
    );
  })
  .add('Comment - 댓글 전체', () => {
    const testText = `외로움이 가득히 피어있는 이 garden 가시투성이 umm 이 모래성에 난 날 매었어 너의 이름은 뭔지 갈 곳이 있긴 한지 Oh could you tell me? ehh 이 정원에 숨어든 널 봤어 And I know 너의 온긴 모두 다 진짜란 걸 푸른 꽃을 꺾는 손 잡고 싶지만 내 운명인 걸 Don't smile on me Light on me 너에게 다가설 수 없으니까 내겐 불러줄 이름이 없어 You know that I can't Show you me Give you me 초라한 모습 보여줄 순 없어 또 가면을 쓰고 널 만나러 가 But I still want you (want you, want you) 외로움의 정원에 핀 너를 닮은 꽃 주고 싶었지 ooh hoo hoo 바보 같은 가면을 벗고서 But I know 영원히 그럴 수는 없는 걸 숨어야만 하는 걸 추한 나니까 난 두려운 걸 초라해 I’m so afraid 결국엔 너도 날 또 떠나버릴까 또 가면을 쓰고 널 만나러 가 할 수 있는 건 정원에 이 세상에 예쁜 너를 닮은 꽃을 피운 다음 니가 아는 나로 숨쉬는 것 But I still want you Ah, ah I still want you, ah 어쩌면 그때 조금만 이만큼만 용길 내서 너의 앞에 섰더라면 지금 모든 건 달라졌을까 난 울고 있어 사라진 무너진 홀로 남겨진 이 모래성에서 부서진 가면을 바라보면서 And I still want you But I still want you But I still want you And I still want you`;
    const user = {
      profile: 'http://placekitten.com/41/40',
    };
    const commentModel = {
      author: {
        fullName: 'tmmoond8',
        profile: 'http://placekitten.com/40/40',
      },
      content: testText.substr(0, 16),
      like: 3,
      replys: [],
    };
    const commentData = [1, 2, 3].map((_, index) => {
      const start = Math.floor((Math.random() * 374) % testText.length);
      const size = Math.floor(Math.random() * 91);
      const comment = {
        ...commentModel,
        content: testText.substr(start, size),
        id: size,
      };
      return {
        ...comment,
        replys: '@'
          .repeat(index)
          .split('')
          .map(_ => comment),
      };
    });
    return (
      <Wrapper>
        <Comment
          user={user}
          commentData={commentData}
          onClickLike={handleClickLike}
          onClickReply={handleClickReply}
        />
      </Wrapper>
    );
  });
