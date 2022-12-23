type Actors = {
  name: string;
}

export type Film = {
  title: string;
  description: string;
  postDate: Date;
  genre: string;
  releaseDate: Date;
  rating: number;
  previewUrl: string;
  videoUrl: string;
  actors: Actors[];
  director: string;
  duration: string;
  commentsAmount: number;
  userUrl: string;
  poster: string;
  backgroundImage: string;
  backgroundColor: string;
}
