import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToClass } from '@nestjs/class-transformer';
import { Observable } from 'rxjs';
import { DataWithPaginationDto } from './generics.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor<T>
  implements
    NestInterceptor<{ data: T[]; total: number }, DataWithPaginationDto<T>>
{
  constructor(private readonly dtoClass: new () => T) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<DataWithPaginationDto<T>> {
    return next.handle().pipe(
      map((response: { data: T[]; total: number }) => {
        const { data, total } = response;

        const transformedData = data.map((item) => {
          return plainToClass(this.dtoClass, item, {
            excludeExtraneousValues: true,
          });
        });

        return {
          data: transformedData,
          meta: {
            total,
            limit: 10,
            offset: 0,
          },
        };
      }),
    );
  }
}
