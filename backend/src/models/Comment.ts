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
import { LikeComment } from './LikeComment';
import { Post } from './Post';
import { ReplyComment } from './ReplyComment';

@Table({
  timestamps: true,
})
export class Comment extends Model<Comment> {
  @AllowNull(false)
  @Column(DataType.STRING(200))
  content!: string;

  @ForeignKey(() => Account)
  accountId!: number;

  @BelongsTo(() => Account)
  profile!: Account;

  @ForeignKey(() => Post)
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;

  @HasMany(() => ReplyComment)
  replyComments?: ReplyComment[];

  @HasMany(() => LikeComment)
  likes?: LikeComment[];
}
