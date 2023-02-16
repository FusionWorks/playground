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
import { ClassTransformOptions } from 'class-transformer';

@Injectable()
export class TransformPaginationResponseInterceptor<T>
  implements
  NestInterceptor<DataWithPaginationDto<any>, DataWithPaginationDto<T>>
{
  constructor(private readonly dtoClass: new () => T, private readonly options?: ClassTransformOptions) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<DataWithPaginationDto<T>> {
    return next.handle().pipe(
      map((response) => {
        const { data, meta } = response;
        const transformedData = data.map((item) => {
          return plainToClass(this.dtoClass, item, this.options);
        });

        return {
          data: transformedData,
          meta,
        };
      }),
    );
  }
}
