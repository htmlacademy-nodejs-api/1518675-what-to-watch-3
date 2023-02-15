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
    this.addRoute({path: '/filmId', method: HttpMethod.Get, handler: this.findById});
    this.addRoute({path: '/filmName', method: HttpMethod.Get, handler: this.findByFilmName});
    this.addRoute({path: '/genre', method: HttpMethod.Get, handler: this.findByGenre});
    // this.addRoute({path: '/filmIdDetails', method: HttpMethod.Get, handler: this.findByFilmIdDetails});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();
    this.send(res, StatusCodes.OK, films);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }

  public async findById(_req: Request, res: Response): Promise<void> {
    // Пока хардкор
    const film = await this.filmService.findByFilmId('63e77e8f3225defb4ba08a30');
    this.send(res, StatusCodes.OK, film);
  }

  public async findByFilmName(_req: Request, res: Response): Promise<void> {
    // Пока хардкор
    const film = await this.filmService.findByFilmName('Django Unchained');
    this.send(res, StatusCodes.OK, film);
  }

  public async findByGenre(_req: Request, res: Response): Promise<void> {
    // Пока хардкор
    const film = await this.filmService.findByGenre('comedy');
    this.send(res, StatusCodes.OK, film);
  }
}
