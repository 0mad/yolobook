import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from './Post';

@Table({
  timestamps: true,
})
export class PostImage extends Model<PostImage> {
  @AllowNull(false)
  @Column(DataType.STRING(200))
  img!: string;

  @ForeignKey(() => Post)
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;
}
