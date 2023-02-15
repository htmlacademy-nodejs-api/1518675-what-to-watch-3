import {Ref} from '@typegoose/typegoose';
import {UserEntity} from '../modules/user/user.entity';

export type Comment = {
  text: string;
  rating: number;
  publicationDate: Date;
  authorId: Ref<UserEntity>;
}
