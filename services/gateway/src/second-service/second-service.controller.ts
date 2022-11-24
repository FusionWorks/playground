import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SecondServiceService } from './second-service.service';

@Controller('second-service-posts')
export class SecondServiceController {
  constructor(private readonly secondServiceService: SecondServiceService) {}

  @Get()
  async getSecondServicePosts() {
    return this.secondServiceService.getSecondServicePosts();
  }

  @Get(':id')
  async getSecondServicePostById(@Param() { id }) {
    return this.secondServiceService.getSecondServicePostById(id);
  }

  @Post()
  async createSecondServicePost(
    @Body() post: { title: string; content: string },
  ) {
    return this.secondServiceService.createSecondServicePost(post);
  }

  @Put(':id')
  async updateSecondServicePost(
    @Param() { id },
    @Body() post: { title: string; content: string },
  ) {
    return this.secondServiceService.updateSecondServicePost(id, post);
  }

  @Delete(':id')
  async deleteSecondServicePost(@Param() { id }) {
    return this.secondServiceService.deleteSecondServicePost(id);
  }
}
