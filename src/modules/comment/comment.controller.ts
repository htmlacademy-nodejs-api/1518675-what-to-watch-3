import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controlller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {CommentServiceInterface} from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import CommentResponse from './response/comment.response.js';
import {fillDTO} from '../../utils/common.js';
import {FilmServiceInterface} from '../film/film-service.interface.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentsController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]

    });
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.find();
    this.send(res, StatusCodes.OK, comments);
  }

  public async create(
    req: Request<object, object, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const {body} = req;

    const comment = await this.commentService.create({...body, authorId: req.user.id});
    await this.filmService.incCommentCount(body.filmId);
    this.created(res, fillDTO(CommentResponse, comment));
  }
}
