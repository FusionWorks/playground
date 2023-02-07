import { Expose, Transform } from '@nestjs/class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PostsDto {
  @Expose()
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

export class PaginationDto {
  total: number;
  limit: number;
  offset: number;
}

export class PostsWithPaginationDto {
  @Expose()
  posts: PostsDto[];

  @Expose()
  pagination: PaginationDto;
}

export class GetPostsDto {
  @IsNotEmpty()
  limit: number;

  @IsOptional()
  offset = 0;
}
