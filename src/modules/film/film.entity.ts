import {defaultClasses, Ref} from '@typegoose/typegoose';
import typegoose, {getModelForClass} from '@typegoose/typegoose';
import {Film} from '../../types/film.type.js';
import {UserEntity} from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})
export class FilmEntity extends defaultClasses.TimeStamps implements Film {
  @prop({required: true, trim: true})
  public title!: string;

  @prop({required: true, trim: true})
  public genre!: string;

  @prop({required: true, trim: true})
  public releaseDate!: string;

  @prop({required: true, trim: true})
  public description!: string;

  @prop({required: true, trim: true})
  public postDate!: string;

  @prop({trim: true})
  public rating!: string;

  @prop({required: true, trim: true})
  public previewUrl!: string;

  @prop({required: true, trim: true})
  public videoUrl!: string;

  @prop({required: true, trim: true})
  public actors!: string;

  @prop({required: true, trim: true})
  public director!: string;

  @prop({required: true, trim: true})
  public duration!: string;

  @prop({required: true, trim: true})
  public commentsAmount!: string;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userUrl!: Ref<UserEntity>;

  @prop({trim: true})
  public poster!: string;

  @prop({trim: true})
  public backgroundImage!: string;

  @prop({trim: true})
  public backgroundColor!: string;
}

export const FilmModel = getModelForClass(FilmEntity);
