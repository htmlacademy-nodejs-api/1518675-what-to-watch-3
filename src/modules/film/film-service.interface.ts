import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';

export interface FilmServiceInterface extends DocumentExistsInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  findByFilmName(filmName: string): Promise<DocumentType<FilmEntity> | null>;
  findFilmsByGenre(genreId: string, count?: number): Promise<DocumentType<FilmEntity>[]>;
  find(): Promise<DocumentType<FilmEntity>[]>;
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  updateById(offerId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  getTotalCommentsById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<FilmEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
