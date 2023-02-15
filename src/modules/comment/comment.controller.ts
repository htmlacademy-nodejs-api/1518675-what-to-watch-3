import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controlller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {CommentServiceInterface} from './comment-service.interface.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentsController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/filmId', method: HttpMethod.Get, handler: this.findCommentsByFilmId});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.find();
    this.send(res, StatusCodes.OK, comments);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }

  public async findCommentsByFilmId(_req: Request, res: Response): Promise<void> {
    // Пока хардкор
    const comments = await this.commentService.findCommentsByFilmId('63e77e8f3225defb4ba08a30');
    this.send(res, StatusCodes.OK, comments);
  }
  //
  // public async findById(_req: Request, res: Response): Promise<void> {
  //   // Пока хардкор
  //   const film = await this.filmService.findByFilmId('63d953196453ee3d83e5f071');
  //   this.send(res, StatusCodes.OK, film);
  // }
  //
  // public async findByFilmName(_req: Request, res: Response): Promise<void> {
  //   // Пока хардкор
  //   const film = await this.filmService.findByFilmName('Django Unchained');
  //   this.send(res, StatusCodes.OK, film);
  // }
  //
}
