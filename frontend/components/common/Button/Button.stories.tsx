import { storiesOf } from '@storybook/react';
import { IoIosThumbsUp } from 'react-icons/io';
import Button from './Button';

const Wrapper = ({ children, title, style = {} }) => (
  <div style={{ display: 'inline-block', padding: '1rem', ...style }}>
    <h3>{title}</h3>
    {children}
  </div>
);

storiesOf('Button', module).add('모든 버튼', () => (
  <div>
    <Wrapper title="green color inline">
      <Button inline={true} theme={'green'} href="/">
        세 계정 만들기
      </Button>
    </Wrapper>
    <Wrapper title="deep green color inline">
      <Button inline={true} theme={'deep-green'} href="/">
        가입하기
      </Button>
    </Wrapper>
    <Wrapper title="style argument inline">
      <Button inline={true}>
        <span style={{ fontWeight: 900 }}>
          <IoIosThumbsUp />
          &nbsp;페이지 좋아요
        </span>
      </Button>
    </Wrapper>
    <Wrapper title="green color inline href">
      <Button inline={true} theme={'green'} href={'https://www.naver.com/'}>
        로그인
      </Button>
    </Wrapper>
    <Wrapper title="harf-circle inline">
      <Button inline={true} shape={'half-circle'}>
        <IoIosThumbsUp />
        &nbsp; 사진/동영상
      </Button>
    </Wrapper>
    <Wrapper title="disabled inline">
      <Button inline={true} disabled={true}>
        버튼 비활성화
      </Button>
    </Wrapper>
    <Wrapper title="blue custom style" style={{ display: 'block' }}>
      <Button theme={'blue'}>
        <span style={{ fontWeight: 900 }}>로그인</span>
      </Button>
    </Wrapper>
    <Wrapper title="no theme custom style" style={{ display: 'block' }}>
      <Button>
        <span style={{ fontWeight: 900 }}>대표 콘텐츠 수정</span>
      </Button>
    </Wrapper>
    <Wrapper title="light-blue custom style" style={{ display: 'block' }}>
      <Button theme={'light-blue'}>
        <span style={{ fontWeight: 900 }}>소개 추가</span>
      </Button>
    </Wrapper>
  </div>
));
