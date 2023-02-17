import { Expose } from '@nestjs/class-transformer';

export class UsersDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
