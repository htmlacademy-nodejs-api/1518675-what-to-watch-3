import {readFileSync} from 'fs';
import {Film} from '../../types/film.type';
import {FileReaderInterface} from './file-reader.interface';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf8'});
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, genre, releaseDate, rating, previewUrl, videoUrl, actors, director, duration, commentsAmount, userUrl, poster, backgroundImage, backgroundColor]) => ({
        title,
        description,
        postDate: new Date(postDate),
        genre,
        releaseDate: new Date(releaseDate),
        rating: Number.parseInt(rating, 10),
        previewUrl,
        videoUrl,
        actors: actors.split(',')
          .map((name) => ({name})),
        director,
        duration,
        commentsAmount: Number.parseInt(commentsAmount, 10),
        userUrl,
        poster,
        backgroundImage,
        backgroundColor
      }));
  }
}
