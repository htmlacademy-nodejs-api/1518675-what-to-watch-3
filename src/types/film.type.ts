import {User} from './user.type';

export type Film = {
  title: string;
  description: string;
  postDate: Date;
  genre: string;
  releaseDate: Date;
  rating: number;
  previewUrl: string;
  videoUrl: string;
  actors: string;
  director: string;
  duration: string;
  commentsAmount: number;
  userUrl: User;
  poster: string;
  backgroundImage: string;
  backgroundColor: string;
}
