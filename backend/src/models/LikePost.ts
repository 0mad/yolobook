import {
  BelongsTo,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from './Account';
import { Post } from './Post';

@Table({
  timestamps: true,
})
export class LikePost extends Model<LikePost> {
  @ForeignKey(() => Post)
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;

  @ForeignKey(() => Account)
  accountId!: number;

  @BelongsTo(() => Account)
  profile!: Account;
}
