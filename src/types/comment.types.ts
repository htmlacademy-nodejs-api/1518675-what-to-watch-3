import {Ref} from '@typegoose/typegoose';
import {UserEntity} from '../modules/user/user.entity.js';
import {FilmEntity} from '../modules/film/film.entity.js';

export type Comment = {
  id: string;
  text: string;
  rating: number;
  publicationDate: Date;
  authorId: Ref<UserEntity>;
  filmId: Ref<FilmEntity>;
}
