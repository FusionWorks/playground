import {
  ClassConstructor,
  ClassTransformOptions,
} from '@nestjs/class-transformer';
import { transformPlainToDataWithPaginationDto } from './pagination.dto';

export function TransformPaginationResponse(
  classType: ClassConstructor<any>,
  params?: ClassTransformOptions,
): MethodDecorator {
  return function (
    target: Record<string, any>,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): void {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]): Record<string, any> {
      const result: any = originalMethod.apply(this, args);
      const isPromise =
        !!result &&
        (typeof result === 'object' || typeof result === 'function') &&
        typeof result.then === 'function';
      return isPromise
        ? result.then((data: any) =>
            transformPlainToDataWithPaginationDto(classType, data, params),
          )
        : transformPlainToDataWithPaginationDto(classType, result, params);
    };
  };
}
