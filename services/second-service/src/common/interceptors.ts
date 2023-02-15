import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { plainToClass } from '@nestjs/class-transformer';
import { Observable } from 'rxjs';

@Injectable()
export class TransformDataInterceptor<T> implements NestInterceptor {
  constructor(private readonly dtoClass: new () => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (response && response.data && Array.isArray(response.data)) {
          response.data = response.data.map((item) =>
            plainToClass(this.dtoClass, item, {
              excludeExtraneousValues: true,
            }),
          );
        }
        return response;
      }),
    );
  }
}
