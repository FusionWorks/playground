import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from '@nestjs/class-transformer';
import { CLASS_TRANSFORM_DTO } from './constants';
import { ClassConstructor } from 'class-transformer';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  constructor(
    @Inject(CLASS_TRANSFORM_DTO)
    private readonly classConstructor: ClassConstructor<unknown>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) =>
        plainToClass(this.classConstructor, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
