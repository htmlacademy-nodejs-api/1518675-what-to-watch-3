import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controlller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {FilmServiceInterface} from './film-service.interface.js';
import {StatusCodes} from 'http-status-codes';
// import {DocumentType} from '@typegoose/typegoose/lib/types.js';
// import {FilmEntity} from './film.entity.js';
// import {ModelType} from '@typegoose/typegoose/lib/types.js';

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();
    this.send(res, StatusCodes.OK, films);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }
  // public async getTotalCommentsById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
  //   return this.filmModel
  //     .findById(filmId)
  //     .aggregate([
  //       {
  //         $lookup: {
  //           from: 'comments',
  //           pipeline: [
  //             {$match: filmId},
  //             {$project: {rating: 1}}
  //           ],
  //           as: 'comments-by-film'
  //         },
  //       },
  //       {
  //         $addFields:
  //           {id: {$toString: '$filmId'}}
  //       }
  //     ])
  //     .exec();
  // }
}
