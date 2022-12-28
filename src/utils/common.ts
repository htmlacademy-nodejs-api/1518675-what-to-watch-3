import {Film} from '../types/film.type';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, genre, releaseDate, rating, previewUrl, videoUrl, actors, director, duration, commentsAmount, userUrl, poster, backgroundImage, backgroundColor] = tokens;
  return {
    title,
    description,
    postDate: new Date(postDate),
    genre,
    releaseDate: new Date(releaseDate),
    rating: Number.parseInt(rating, 10),
    previewUrl,
    videoUrl,
    actors,
    director,
    duration,
    commentsAmount: Number.parseInt(commentsAmount, 10),
    userUrl,
    poster,
    backgroundImage,
    backgroundColor
  } as Film;
};

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';
