import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import CreateUsersDto from './dto/create-users.dto';
import { Users, UsersDocument } from './users.schema';

@Injectable()
class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async findAll() {
    return this.usersModel.find();
  }

  async findOne(id: string) {
    const user = await this.usersModel.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  create(postData: CreateUsersDto) {
    const createdUser = new this.usersModel(postData);
    return createdUser.save();
  }
}

export default UsersService;
