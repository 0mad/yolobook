import PageTemplate from '../components/common/PageTemplate';
import { IoIosThumbsUp } from 'react-icons/io';
import Button from '../components/common/Button';

interface IProps {}

const Anatomy = (props: IProps) => (
  <PageTemplate>
    <div>Anatomy 페이지</div>
    <h1>데스크탑 버튼</h1>

    <h3>세 계정 만들기</h3>
    <Button inline theme={'green'}>
      세 계정 만들기
    </Button>

    <h3>가입하기</h3>
    <Button inline theme={'deep-green'}>
      가입하기
    </Button>

    <h3>페이지 좋아요</h3>
    <Button inline>
      <span style={{ fontWeight: 900 }}>
        <IoIosThumbsUp />
        &nbsp;페이지 좋아요
      </span>
    </Button>

    <h3>로그인</h3>
    <Button inline theme={'green'} href={'https://www.naver.com/'}>
      로그인
    </Button>

    <h3>사진/동영상</h3>
    <Button inline shape={'half-circle'}>
      <IoIosThumbsUp />
      &nbsp; 사진/동영상
    </Button>

    <h3>버튼 비활성화</h3>
    <Button inline disabled>
      버튼 비활성화
    </Button>

    <hr />

    <h1>모바일 버튼</h1>

    <h3>로그인</h3>
    <Button theme={'blue'}>
      <span style={{ fontWeight: 900 }}>로그인</span>
    </Button>

    <h3>대표 콘텐츠 수정</h3>
    <Button>
      <span style={{ fontWeight: 900 }}>대표 콘텐츠 수정</span>
    </Button>

    <h3>소개 추가</h3>
    <Button theme={'light-blue'}>
      <span style={{ fontWeight: 900 }}>소개 추가</span>
    </Button>
  </PageTemplate>
);

export default Anatomy;
