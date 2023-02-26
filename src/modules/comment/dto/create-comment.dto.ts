import {IsMongoId, IsString, Length} from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 2, max is 400'})
  public text!: string;

  @IsMongoId({message: 'filmId field must be a valid id'})
  public filmId!: string;

  public authorId!: string;
}
