import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';

export interface FilmServiceInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findByFilmId(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  findByFilmIdDetails(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  findByFilmName(filmName: string): Promise<DocumentType<FilmEntity> | null>;
  findByGenreId(genreId: string, count?: number): Promise<DocumentType<FilmEntity>[]>;
  find(): Promise<DocumentType<FilmEntity>[]>;
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  updateById(offerId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
}
