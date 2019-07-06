import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from './Account';
import { Comment } from './Comment';
import { LikeReplyComment } from './LikeReplyComment';

@Table({
  timestamps: true,
})
export class ReplyComment extends Model<ReplyComment> {
  @AllowNull(false)
  @Column(DataType.STRING(200))
  content!: string;

  @ForeignKey(() => Account)
  accountId!: number;

  @BelongsTo(() => Account)
  profile!: Account;

  @ForeignKey(() => Comment)
  commentId!: number;

  @BelongsTo(() => Comment)
  comment?: Comment;

  @HasMany(() => LikeReplyComment)
  likes?: LikeReplyComment[];
}
