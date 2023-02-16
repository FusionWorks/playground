import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Expose } from '@nestjs/class-transformer';

export class PaginationParamsDto {
  @IsNotEmpty()
  @Min(0)
  limit = 10;

  @IsOptional()
  @Min(0)
  offset = 0;
}

export class DataWithPaginationDto<T> {
  @Expose()
  data: T[];

  @Expose()
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}
