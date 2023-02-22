import { Expose, Transform } from '@nestjs/class-transformer';
import { DataWithPaginationDto, PaginationParamsDto } from '../../common/pagination/pagination.dto';

export class PostDto {
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
