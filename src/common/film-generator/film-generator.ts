import {MockData} from '../../types/mock-data.type.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../utils/random.js';
import {FilmGeneratorInterface} from './film-generator.interface';
import dayjs from 'dayjs';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_FILM_HOURS_DURATION = 1;
const MAX_FILM_HOURS_DURATION = 3;
const MIN_FILM_MINUTES_DURATION = 0;
const MAX_FILM_MINUTES_DURATION = 59;

export default class FilmGenerator implements FilmGeneratorInterface {
  constructor(private readonly mockData: MockData) {
  }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genre = getRandomItems<string>(this.mockData.genre).join(';');
    const releaseDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const rating = generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY).toString();
    const previewUrl = getRandomItem<string>(this.mockData.previewUrl);
    const videoUrl = getRandomItem<string>(this.mockData.videoUrl);
    const actors = getRandomItems<string>(this.mockData.actors).join(';');
    const director = getRandomItem<string>(this.mockData.director);
    const duration = `${generateRandomValue(MIN_FILM_HOURS_DURATION, MAX_FILM_HOURS_DURATION)}h ${generateRandomValue(MIN_FILM_MINUTES_DURATION, MAX_FILM_MINUTES_DURATION)}`;
    const commentsAmount = generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY);
    const userUrl = getRandomItem<string>(this.mockData.userUrl);
    const poster = getRandomItem<string>(this.mockData.poster);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImage);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColor);
    return [
      title, description, postDate, genre, releaseDate, rating, previewUrl, videoUrl, actors,
      director, duration, commentsAmount, userUrl, poster, backgroundImage, backgroundColor
    ].join('\t');
  }
}
