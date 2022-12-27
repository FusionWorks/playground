import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from '@nestjs/class-transformer';
import { PostsDto } from './dto/posts.dto';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) =>
          plainToClass(PostsDto, data, { excludeExtraneousValues: true }),
        ),
      );
  }
}
