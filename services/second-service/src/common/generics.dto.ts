import { IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from '@nestjs/class-transformer';

export class PaginationParamsDto {
  @IsNotEmpty()
  limit = 10;

  @IsOptional()
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
