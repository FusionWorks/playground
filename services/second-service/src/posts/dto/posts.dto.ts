import { Expose, Transform } from '@nestjs/class-transformer';

export class PostsDto {
  @Expose() // or we can use @Exclude to exclude it
  id: string;

  @Expose()
  title: string;

  @Expose()
  @Transform(({ value }) => value || 'No-content')
  content: string;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toJSON().slice(0, 10).replace(/-/g, '/') : null,
  )
  createdAt: Date | null;
}
