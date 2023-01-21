import {defaultClasses} from '@typegoose/typegoose';
import typegoose, {getModelForClass} from '@typegoose/typegoose';
import {Film} from '../../types/film.type.js';
import {User} from '../../types/user.type';

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
  public releaseDate!: Date;

  @prop({required: true, trim: true})
  public description!: string;

  @prop({required: true, trim: true})
  public postDate!: Date;

  @prop({required: true, trim: true})
  public rating!: number;

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
  public commentsAmount!: number;

  @prop({required: true, trim: true})
  public userUrl!: User;

  @prop({required: true, trim: true})
  public poster!: string;

  @prop({required: true, trim: true})
  public backgroundImage!: string;

  @prop({required: true, trim: true})
  public backgroundColor!: string;
}

export const FilmModel = getModelForClass(FilmEntity);
