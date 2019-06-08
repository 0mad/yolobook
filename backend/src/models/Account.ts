import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Column,
  Default,
  Model,
  Table,
} from 'sequelize-typescript';
import { hash } from '../lib/crypto';
import { generateToken } from '../lib/token';

@Table({
  timestamps: true,
})
export class Account extends Model<Account> {
  public get profile(): object {
    return {
      username: this.username,
      thumbnail: this.thumbnail,
    };
  }

  @BeforeCreate
  @BeforeUpdate
  static encryptLocalPassword(instance: Account) {
    instance.password = hash(instance.password);
  }
  @AllowNull(false)
  @Column
  username!: string;

  @Default('/static/images/default_thumbnail.png')
  @AllowNull
  @Column
  thumbnail?: string;

  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;

  public generateToken() {
    const payload = {
      _id: this.id,
      profile: this.profile,
    };
    return generateToken(payload);
  }

  public validatePassword(password: string) {
    // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const hashed = hash(password);
    return this.password === hashed;
  }
}
