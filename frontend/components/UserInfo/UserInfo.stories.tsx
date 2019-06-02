import { storiesOf } from '@storybook/react';
import UserInfo from './UserInfo';

const data = {
  defaultData: {
    introduction: `나는 해적왕이 될 사람이다.
    나는 해적왕이 될꺼라구`,
    isEdit: false,
  },
  onEdit: {
    introduction: `나는 해적왕이 될 사람이다.
    나는 해적왕이 될꺼라구`,
    isEdit: true,
  },
};

storiesOf('UserInfo', module)
  .add('내 정보 보기', () => (
    <div style={{ margin: '20px', backgroundColor: 'gray' }}>
      <UserInfo {...data.defaultData} />
    </div>
  ))
  .add('내 정보 수정', () => (
    <div style={{ margin: '20px', backgroundColor: 'gray' }}>
      <UserInfo {...data.onEdit} />
    </div>
  ));
