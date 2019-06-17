import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from './Account';

@Table({
  timestamps: true,
})
export class Follow extends Model<Follow> {

  @Default('REQUESTING')
  @AllowNull(false)
  @Column
  status!: string;

  @ForeignKey(() => Account)
  @Column
  followerId!: number;

  @BelongsTo(() => Account, 'followerId')
  follower!: Account;

  @ForeignKey(() => Account)
  @Column
  followingId!: number;

  @BelongsTo(() => Account, 'followingId')
  following!: Account;
}
