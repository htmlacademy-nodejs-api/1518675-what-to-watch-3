import {inject, injectable} from 'inversify';
import {CommentServiceInterface} from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import {Component} from '../../types/component.types.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByFilmId(filmId: string): Promise<DocumentType<CommentEntity> | null> {
    // return this.commentModel.findById(filmId).exec();

    return this.commentModel
      .findById(filmId)
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            pipeline: [
              {$match: filmId}
            ],
            as: 'comments-by-film'
          },
        },
        { $addFields:
            { id: { $toString: '$_id'}, commentCount: { $size: '$comments'} }
        },
      ])
      .exec();
  }

  public async deleteByFilmId(filmId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({filmId})
      .exec();

    return result.deletedCount;
  }
}
