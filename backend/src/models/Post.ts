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
import { PostImage } from './PostImage';

@Table({
  timestamps: true,
})
export class Post extends Model<Post> {
  @AllowNull(false)
  @Column(DataType.STRING(140))
  content!: string;

  @ForeignKey(() => Account)
  accountId!: number;

  @BelongsTo(() => Account)
  account!: Account;

  @HasMany(() => PostImage)
  imgs?: PostImage[];

  public get info(): object {
    const { id: accountId, username, thumbnail } = this.account;
    const oldImgs: any = this.imgs;
    const newImgs: any = [];
    oldImgs.forEach((img: any) => {
      newImgs.push({
        id: img.id,
        img: img.img,
      });
    });
    return {
      id: this.id,
      content: this.content,
      user: {
        id: accountId,
        thumbnail,
        username,
      },
      imgs: newImgs,
    };
  }
}
