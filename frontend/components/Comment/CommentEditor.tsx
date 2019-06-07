import classNames from 'classnames/bind';
import { ChangeEventHandler, Component  } from 'react';
import styles from './CommentEditor.scss';
const cx = classNames.bind(styles);

interface IProps {
  user: any;
  reply?: boolean;
}

interface IState {
  value: string;
}

class CommentEditor extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: "",
    }
  }
  render () {
    const { reply, user } = this.props;
    const { value } = this.state;
    const hasContent = value.length > 0;
    return (
      <div className={cx('comment-edit', {reply})}>
        <img className={cx('user-profile')} src={user.profile}/>
        <form className={cx('input-form')} onSubmit={this.handleSendComment}>
          <textarea 
            className={cx('input-content', {hasContent})} 
            placeholder="댓글을 입력하세요..."
            onChange={this.handleTextareaChange}
            value={value}
          />
          <button className={cx('button-send')} type="submit">
            {reply ? '답글' : '게시'}
          </button>
        </form>
      </div>
    );
  }

  handleTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const {
      target: {
        value
      }
    } = event;
    this.setState({
      value
    });
  }

  handleSendComment = (event: any) => {
    event.preventDefault();
  }
}

export default CommentEditor;