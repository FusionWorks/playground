import { Expose, Transform } from '@nestjs/class-transformer';
import { PaginationParamsDto } from '../../common/pagination/pagination.dto';

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

export class GetPostsDto extends PaginationParamsDto { }
