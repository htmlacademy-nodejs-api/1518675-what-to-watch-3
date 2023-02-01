import {User} from './user.type';

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
  userUrl: User;
  poster: string;
  backgroundImage: string;
  backgroundColor: string;
}
