import {User} from '../../../types/user.type';

export default class UpdateFilmDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public genre?: string;
  public releaseDate?: Date;
  public rating?: number;
  public previewUrl?: string;
  public videoUrl?: string;
  public actors?: string;
  public director?: string;
  public duration?: string;
  public commentsAmount?: number;
  public userUrl?: User;
  public poster?: string;
  public backgroundImage?: string;
  public backgroundColor?: string;
}
