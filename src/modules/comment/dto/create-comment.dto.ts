export default class CreateCommentDto {
  public text!: string;
  public rating!: string;
  public publicationDate!: Date;
  public author!: string;
  public authorId!: string;
  public filmId!: string;
}
