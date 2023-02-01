import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {FilmEntity} from '../film/film.entity.js';
import {UserEntity} from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public text!: string;

  @prop({trim: true})
  public rating!: string;

  @prop()
  public publicationDate!: string;

  @prop()
  public author!: Date;

  @prop()
  public price!: number;

  @prop({default: 0})
  public commentCount!: number;

  @prop({
    ref: FilmEntity,
    required: true,
    default: [],
    _id: false
  })
  public films!: Ref<FilmEntity>[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
