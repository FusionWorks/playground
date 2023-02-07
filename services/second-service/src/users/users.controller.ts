import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import CreateUsersDto from './dto/create-users.dto';
import ParamsWithId from '../utils/paramsWithId';
import UsersService from './users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param() { id }: ParamsWithId) {
    return this.usersService.findOne(id);
  }

  @Post()
  async createUser(@Body() user: CreateUsersDto) {
    return this.usersService.create(user);
  }
}
