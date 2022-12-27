import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersDto } from './dto/users.dto';
import { CLASS_TRANSFORM_DTO } from '../constants';
import UsersController from './users.controller';
import { usersForFeature } from './users.schema';
import UsersService from './users.service';

@Module({
  imports: [MongooseModule.forFeature([usersForFeature])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: CLASS_TRANSFORM_DTO,
      useValue: UsersDto,
    },
  ],
})
class UsersModule {}

export default UsersModule;
