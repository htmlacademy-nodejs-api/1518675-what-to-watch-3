import {Ref} from '@typegoose/typegoose';
import {UserEntity} from '../modules/user/user.entity.js';

export type Film = {
  title: string;
  description: string;
  postDate: string;
  genre: string;
  releaseDate: string;
  rating: string;
  previewUrl: string;
  videoUrl: string;
  actors: string;
  director: string;
  duration: string;
  commentsAmount: string;
  userUrl: Ref<UserEntity>;
  poster: string;
  backgroundImage: string;
  backgroundColor: string;
}
