import {inject, injectable} from 'inversify';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types.js';
import {FilmServiceInterface} from './film-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {FilmEntity} from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
// import {DEFAULT_FILM_COUNT} from './film.constant.js';

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

  public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findById(filmId)
      .populate(['userUrl'])
      .exec();
  }

  public async findByFilmName(filmName: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findOne({title: filmName}).exec();
  }

  public async findByGenre(genre: string, count?: number): Promise<DocumentType<FilmEntity>[]> {
    console.log(count);
    // const limit = count ?? DEFAULT_FILM_COUNT;
    return this.filmModel
      // .find({genre: genre}, {}, {limit})
      .aggregate([
        {$project: {genre: {$split: ['$genre', ', ']}, qty: 1}},
        {$match: {genre}}])
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
    // const limit = count ?? DEFAULT_FILM_COUNT;
    return this.filmModel
      .find()
      .populate('userUrl')
      .exec();
  }

  public async updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, dto, {new: true})
      .populate(['userUrl'])
      .exec();
  }

  public async incCommentCount(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, {
        '$inc': {
          commentCount: 1,
        }
      }).exec();
  }

  public async getTotalCommentsById(filmId: string): Promise<DocumentType<FilmEntity> | null> {

    return this.filmModel
      .findById(filmId)
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            pipeline: [
              {$match: filmId},
              {$project: {rating: 1}}
            ],
            as: 'comments-by-film'
          },
        },
        {
          $addFields:
            {id: {$toString: '$filmId'}}
        }
      ])
      .exec();
  }
}
