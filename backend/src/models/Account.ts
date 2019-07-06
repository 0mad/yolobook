import {
  AllowNull,
  Column,
  Default,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { generateToken } from '../lib/token';
import { Comment } from './Comment';
import { Follow } from './Follow';
import { LikeComment } from './LikeComment';
import { LikePost } from './LikePost';
import { LikeReplyComment } from './LikeReplyComment';
import { Post } from './Post';

@Table({
  timestamps: true,
})
export class Account extends Model<Account> {
  @AllowNull(false)
  @Column
  username!: string;

  @Default('/static/images/default_thumbnail.png')
  @Column
  thumbnail?: string;

  @Column
  coverImg?: string;

  @Column
  email!: string;

  @AllowNull(false)
  @Column
  provider!: string;

  @AllowNull(false)
  @Column
  snsId!: string;

  @Column
  description?: string;

  @HasMany(() => Post)
  posts?: Post[];

  @HasMany(() => Comment)
  comments?: Comment[];

  @HasMany(() => Follow)
  follows?: Follow[];

  @HasMany(() => LikePost)
  likePosts?: LikePost;

  @HasMany(() => LikeComment)
  likeComments?: LikeComment;

  @HasMany(() => LikeReplyComment)
  likeReplyComments?: LikeReplyComment;

  public get profile(): object {
    return {
      coverImg: this.coverImg,
      description: this.description,
      id: this.id,
      thumbnail: this.thumbnail,
      username: this.username,
    };
  }

  public generateToken() {
    const payload = {
      profile: this.profile,
    };
    return generateToken(payload);
  }
}
