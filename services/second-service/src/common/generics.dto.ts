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
  readonly limit: number = 10;

  @ApiPropertyOptional({
    minimum: 0,
    default: 0,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly offset: number = 0;
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
