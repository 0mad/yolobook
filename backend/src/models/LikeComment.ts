import {
  BelongsTo,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from './Account';
import { Comment } from './Comment';

@Table({
  timestamps: true,
})
export class LikeComment extends Model<LikeComment> {
  @ForeignKey(() => Comment)
  commentId!: number;

  @BelongsTo(() => Comment)
  comment?: Comment;

  @ForeignKey(() => Account)
  accountId!: number;

  @BelongsTo(() => Account)
  profile!: Account;
}
