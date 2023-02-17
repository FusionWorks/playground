import { Expose, Transform, Exclude } from '@nestjs/class-transformer';

export class UpdatePostsDto {
  @Exclude()
  id: string;

  @Expose()
  title: string;

  @Expose()
  @Transform(({ value }) => value || 'No-content')
  content: string;

  @Expose()
  createdAt: Date;
}
