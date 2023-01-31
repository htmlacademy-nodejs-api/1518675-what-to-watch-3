import {inject, injectable} from 'inversify';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types.js';
import {FilmServiceInterface} from './film-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {FilmEntity} from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {DEFAULT_FILM_COUNT} from './film.constant.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: ModelType<FilmEntity>
  ) {
  }

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.title}`);
    return result;
  }

  public async findByFilmId(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    // return this.filmModel.findById(filmId).exec();
    return this.filmModel
      .findById(filmId)
      .populate(['filmId'])
      .exec();
  }

  public async findByFilmIdDetails(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    // return this.filmModel.findById(filmId).exec();
    return this.filmModel
      .findById(filmId)
      .populate(['filmId'])
      .exec();
  }

  public async findByFilmName(filmName: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findOne({name: filmName}).exec();
  }

  public async findByGenreId(genreId: string, count?: number): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;
    return this.filmModel
      .find({genre: genreId}, {}, {limit})
      .populate(['userId', 'genre'])
      .exec();
  }

  public async findByFilmNameOrCreate(filmName: string, dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const existedFilm = await this.findByFilmName(filmName);

    if (existedFilm) {
      return existedFilm;
    }

    return this.create(dto);
  }

  public async deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndDelete(filmId)
      .exec();
  }

  public async find(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel.find();
  }

  public async updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  // public async calculateAverageRatingById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
  //
  //   return;
  // }
}
