import {Film} from '../types/film.type';
import * as crypto from 'crypto';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, name, email, avatar, password, description, postDate, genre, releaseDate, rating, previewUrl, videoUrl, actors, director, duration, commentsAmount, poster, backgroundImage, backgroundColor] = tokens;
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
    userUrl: {name, email, avatar, password},
    poster,
    backgroundImage,
    backgroundColor
  } as Film;
};

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';
