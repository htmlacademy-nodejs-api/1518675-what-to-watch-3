import {IsDateString, IsInt, IsMongoId, IsOptional, Max, MaxLength, Min, MinLength} from 'class-validator';

export default class UpdateFilmDto {
  @IsOptional()
  @MinLength(3, {message: 'Minimum title length must be 3'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate?: Date;

  @IsOptional()
  @MinLength(10, {message: 'Minimum genre length must be 10'})
  @MaxLength(200, {message: 'Maximum genre length must be 200'})
  public genre?: string;

  @IsOptional()
  @IsDateString({}, {message: 'releaseDate must be valid ISO date'})
  public releaseDate?: Date;

  @IsOptional()
  @IsInt({message: 'Rating must be an integer'})
  @Min(0, {message: 'Minimum rating is 0'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating?: number;

  @IsOptional()
  @MaxLength(256, {message: 'Too short for field «previewUrl»'})
  public previewUrl?: string;

  @IsOptional()
  @MaxLength(256, {message: 'Too short for field «videoUrl»'})
  public videoUrl?: string;

  @IsOptional()
  @MinLength(10, {message: 'Minimum actors length must be 10'})
  @MaxLength(200, {message: 'Maximum actors length must be 200'})
  public actors?: string;

  @IsOptional()
  @MinLength(3, {message: 'Minimum director length must be 3'})
  @MaxLength(200, {message: 'Maximum director length must be 200'})
  public director?: string;

  @IsOptional()
  @MinLength(4, {message: 'Minimum director length must be 4'})
  @MaxLength(20, {message: 'Maximum director length must be 20'})
  public duration?: string;

  @IsOptional()
  @IsInt({message: 'Comments must be an integer'})
  @Min(0, {message: 'Minimum comments is 0'})
  @Max(5, {message: 'Maximum comments is 5'})
  public commentsAmount?: number;

  @IsOptional()
  @IsMongoId({message: 'userId field must be valid an id'})
  public userUrl?: string;

  @IsOptional()
  @MaxLength(256, {message: 'Too short for field «poster»'})
  public poster?: string;

  @IsOptional()
  @MaxLength(256, {message: 'Too short for field «backgroundImage»'})
  public backgroundImage?: string;

  @IsOptional()
  @MaxLength(256, {message: 'Too short for field «backgroundColor»'})
  public backgroundColor?: string;
}
