import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DataWithPaginationDto, transformPlainToDataWithPaginationDto } from './pagination.dto';
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
      map((response) => transformPlainToDataWithPaginationDto(this.dtoClass, response, this.options)),
    );
  }
}
