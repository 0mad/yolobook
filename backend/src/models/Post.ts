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
import { LikePost } from './LikePost';
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

  @HasMany(() => Comment)
  comments?: Comment[];

  @HasMany(() => LikePost)
  likes?: LikePost[];

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
      comments: this.comments,
      content: this.content,
      createdAt: this.createdAt,
      id: this.id,
      imgs: newImgs,
      likes: this.likes,
      profile: {
        id: accountId,
        thumbnail,
        username,
      },
    };
  }

  public static getPosts = async ({ where = {} } = {}) => (
    await Post.findAll({
      include: [
        Account,
        PostImage,
        {
          association: 'likes', attributes: ['id', 'accountId']
        },
        {
          association: 'comments',
          attributes: ['id', 'createdAt', 'content'],
          include: [
            {
              association: 'profile',
              attributes: ['id', 'username', 'thumbnail'],
            },
            {
              association: 'replyComments',
              attributes: ['id', 'createdAt', 'content'],
              include: [
                {
                  association: 'profile',
                  attributes: ['id', 'username', 'thumbnail'],
                },
                {
                  association: 'likes', attributes: ['id', 'accountId']
                },
              ],
            },
            {
              association: 'likes', attributes: ['id', 'accountId']
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
      where
    })
  );
}
