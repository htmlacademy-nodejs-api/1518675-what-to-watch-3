import {Film} from '../types/film.type';
import * as crypto from 'crypto';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
import * as jose from 'jose';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    name,
    email,
    avatar,
    password,
    description,
    postDate,
    genre,
    releaseDate,
    rating,
    previewUrl,
    videoUrl,
    actors,
    director,
    duration,
    commentsAmount,
    poster,
    backgroundImage,
    backgroundColor] = tokens;

  return {
    title,
    description,
    postDate: new Date(postDate).toString(),
    genre,
    releaseDate: new Date(releaseDate).toString(),
    rating: Number.parseInt(rating, 10).toString(),
    previewUrl,
    videoUrl,
    actors,
    director,
    duration,
    commentsAmount: Number.parseInt(commentsAmount, 10).toString(),
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

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algorithm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
