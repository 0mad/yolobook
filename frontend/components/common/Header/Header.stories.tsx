import { storiesOf } from '@storybook/react';
import Header from './Header';
import HeaderSearchBar from './HeaderSearchBar';

const Wrapper = ({ children, title, style = {} }) => (
  <div style={{ display: 'inline-block', padding: '1rem', ...style }}>
    <h3>{title}</h3>
    {children}
  </div>
);

storiesOf('Header', module).add('로그인 하지 않은 헤더', () => (
  <div>
    <Header isLogined={false}/>
  </div>
));
storiesOf('Header', module)
  .add('로그인 한 헤더', () => {
    const profile = {
      id: 98,
      thumbnail: 'http://placekitten.com/40/40',
      username: '욜로욜로',
    };
    return (
      <div>
        <Header isLogined={true} profile={profile}/>
      </div>
    )
  })
  .add('HeaderSearchBar', () => (
    <div>
      <Wrapper title="default" style={{ backgroundColor: 'gray' }}>
        <HeaderSearchBar />
      </Wrapper>
      <Wrapper
        title="너비가 공간을 차지"
        style={{ width: '400px', backgroundColor: 'gray' }}
      >
        <HeaderSearchBar />
      </Wrapper>
    </div>
  ));
