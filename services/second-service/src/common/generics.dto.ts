import { IsInt, IsOptional, Min } from 'class-validator';
import { Expose } from '@nestjs/class-transformer';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationParamsDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly perPage?: number = 10;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;
}

export class DataWithPaginationDto<T> {
  @Expose()
  data: T[];

  @Expose()
  metadata: {
    total: number;
    perPage: number;
    page: number;
    lastPage: number;
  };
}
