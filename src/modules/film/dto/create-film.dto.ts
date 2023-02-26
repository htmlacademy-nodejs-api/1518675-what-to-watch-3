import {IsDateString, IsInt, Max, MaxLength, Min, MinLength} from 'class-validator';

export default class CreateFilmDto {
  @MinLength(3, {message: 'Minimum title length must be 3'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  public userUrl!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: string;

  @MinLength(10, {message: 'Minimum genre length must be 10'})
  @MaxLength(200, {message: 'Maximum genre length must be 200'})
  public genre!: string;

  @IsDateString({}, {message: 'releaseDate must be valid ISO date'})
  public releaseDate!: string;

  @IsInt({message: 'Rating must be an integer'})
  @Min(0, {message: 'Minimum rating is 0'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating!: number;

  @MaxLength(256, {message: 'Too short for field «previewUrl»'})
  public previewUrl!: string;

  @MaxLength(256, {message: 'Too short for field «videoUrl»'})
  public videoUrl!: string;

  @MinLength(10, {message: 'Minimum actors length must be 10'})
  @MaxLength(200, {message: 'Maximum actors length must be 200'})
  public actors!: string;

  @MinLength(3, {message: 'Minimum director length must be 3'})
  @MaxLength(200, {message: 'Maximum director length must be 200'})
  public director!: string;

  @MinLength(4, {message: 'Minimum director length must be 4'})
  @MaxLength(20, {message: 'Maximum director length must be 20'})
  public duration!: string;

  @IsInt({message: 'Comments must be an integer'})
  @Min(0, {message: 'Minimum comments is 0'})
  @Max(5, {message: 'Maximum comments is 5'})
  public commentsAmount!: string;

  @MaxLength(256, {message: 'Too short for field «poster»'})
  public poster!: string;

  @MaxLength(256, {message: 'Too short for field «backgroundImage»'})
  public backgroundImage!: string;

  @MaxLength(256, {message: 'Too short for field «backgroundColor»'})
  public backgroundColor!: string;
}
