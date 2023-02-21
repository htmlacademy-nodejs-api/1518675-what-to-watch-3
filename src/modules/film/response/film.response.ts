import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class FilmResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public genre!: string[];

  @Expose()
  public releaseDate!: string;

  @Expose()
  public rating!: string;

  @Expose()
  public previewUrl!: string;

  @Expose()
  public videoUrl!: string;

  @Expose()
  public actors!: string;

  @Expose()
  public director!: string;

  @Expose()
  public duration!: string;

  @Expose()
  public commentsAmount!: string;

  @Expose({ name: 'userUrl'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public poster!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public backgroundColor!: string;
}
