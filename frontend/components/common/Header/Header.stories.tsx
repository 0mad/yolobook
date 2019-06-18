import { text } from '@storybook/addon-knobs';
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
  .add('HeaderSearchBar', () => {
    const userList = [
      { id: 12, username: '문태민', thumbnail: 'http://placekitten.com/40/40'},
      { id: 15, username: '유주현', thumbnail: 'http://placekitten.com/41/40'},
    ];
    const searchText = text('search', '');
    
    return (
      <div>
        <Wrapper title="default" style={{ backgroundColor: 'gray' }}>
          <HeaderSearchBar isMobileMode={false} searchActive={false} userList={userList} search={searchText}/>
        </Wrapper>
        <Wrapper
          title="너비가 공간을 차지"
          style={{ width: '400px', backgroundColor: 'gray' }}
        >
          <HeaderSearchBar isMobileMode={false} searchActive={true} userList={userList} search={searchText}/>
        </Wrapper>
        <Wrapper
          title="모바일 보일 때"
          style={{ position: 'relative', width: '600px', height: '40px', marginTop: '80px', backgroundColor: 'gray' }}
        >
          <HeaderSearchBar isMobileMode={true} searchActive={true} userList={userList} search={searchText}/>
        </Wrapper>
      </div>
    )
  });
