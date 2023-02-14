import {inject, injectable} from 'inversify';
import {CommentServiceInterface} from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);
    return comment.populate('authorId');
  }

  // public async findCommentsByFilmId(filmId: string): Promise<DocumentType<CommentEntity>[]> {
  //   return this.commentModel
  //     .find({filmId: filmId}, {}, {})
  //     .exec();
  // }

  public async find(): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find()
      .populate('authorId')
      .exec();
  }

  public async findCommentsByFilmId(filmId: string): Promise<DocumentType<CommentEntity>[]> {
    // return this.commentModel.findById(filmId).exec();

    return this.commentModel
      .find({$filmId: {$search: filmId}})
      .exec();

    // return this.commentModel
    //   .aggregate([
    //     {
    //       $lookup: {
    //         from: 'comments',
    //         pipeline: [
    //           { $match: { filmId: filmId } },
    //           { $project: { _id: 1}}
    //         ],
    //         as: 'comments'
    //       },
    //     },
    //     { $addFields:
    //         { id: { $toString: '$_id'}, commentCount: { $size: '$comments'} }
    //     },
    //   ]).exec();
  }

  public async deleteByCommentId(commentId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({commentId})
      .exec();

    return result.deletedCount;
  }
}
