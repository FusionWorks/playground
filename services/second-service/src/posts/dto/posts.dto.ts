import { Expose, Transform } from '@nestjs/class-transformer';
import {
  DataWithPaginationDto,
  PaginationParamsDto,
} from '../../generics/common.dto';

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

export class PostsWithPaginationDto extends DataWithPaginationDto<PostsDto> {}
export class GetPostsDto extends PaginationParamsDto {}
