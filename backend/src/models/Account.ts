import {
  AllowNull,
  Column,
  Default,
  Model,
  Table,
} from 'sequelize-typescript';
import { generateToken } from '../lib/token';

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

  @AllowNull(false)
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

  public get profile(): object {
    return {
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
