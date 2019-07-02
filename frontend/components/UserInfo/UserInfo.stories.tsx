import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import UserInfo from './UserInfo';

const onChangeInput = action('input change');
const onToggleEdit = action('toggle edit');
const onModify = action('modify');

storiesOf('UserInfo', module)
  .add('내 정보 보기', () => {
    const description = text('description', `나는 해적왕이 될 사람이다.
    나는 해적왕이 될꺼라구`);
    return (
      <div style={{ margin: '20px', backgroundColor: 'gray' }}>
        <UserInfo
          description={description}
          editDescription={description}
          canModify={true}
          isEdit={false}
          onChangeInput={onChangeInput}
          onToggleEdit={onToggleEdit}
          onModify={onModify}
        />
      </div>
    );
  })
  .add('내 정보 수정', () => {
    const description = text('description', `나는 해적왕이 될 사람이다.
    나는 해적왕이 될꺼라구`);
    return (
      <div style={{ margin: '20px', backgroundColor: 'gray' }}>
        <UserInfo
          description={description}
          editDescription={description}
          canModify={true}
          isEdit={true}
          onChangeInput={onChangeInput}
          onToggleEdit={onToggleEdit}
          onModify={onModify}
        />
      </div>
    );
  });
