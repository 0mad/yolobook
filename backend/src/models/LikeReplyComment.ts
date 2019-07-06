import {
  BelongsTo,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from './Account';
import { ReplyComment } from './ReplyComment';

@Table({
  timestamps: true,
})
export class LikeReplyComment extends Model<LikeReplyComment> {
  @ForeignKey(() => ReplyComment)
  replyCommentId!: number;

  @BelongsTo(() => ReplyComment)
  replyComment?: ReplyComment;

  @ForeignKey(() => Account)
  accountId!: number;

  @BelongsTo(() => Account)
  profile!: Account;
}
