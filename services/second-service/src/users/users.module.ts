import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UsersController from './users.controller';
import { usersForFeature } from './users.schema';
import UsersService from './users.service';

@Module({
  imports: [MongooseModule.forFeature([usersForFeature])],
  controllers: [UsersController],
  providers: [UsersService],
})
class UsersModule {}

export default UsersModule;
