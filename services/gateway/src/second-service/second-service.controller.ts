import { Body, Controller, Delete, Get, Param, Post, Put, Render } from '@nestjs/common';
import { SecondServiceService } from './second-service.service';

@Controller()
export class SeconsServiceController {

  constructor(private readonly secondServiceService: SecondServiceService) {}

  @Get('second-service-posts')
  async getSecondServicePosts() {
    return this.secondServiceService.getSecondServicePosts();
  }

  @Get('second-service-post/:id')
  async getSecondServicePostById(@Param() { id }) {
    return this.secondServiceService.getSecondServicePostById(id);
  }

  @Post('second-service-create-post')
  async createSecondServicePost(@Body() post: { title: string, content: string }) {
    return this.secondServiceService.createSecondServicePost(post);
  }

  @Put('second-service-update-post/:id')
  async updateSecondServicePost(@Param() { id }, @Body() post: { title: string, content: string }) {
    return this.secondServiceService.updateSecondServicePost(id, post);
  }

  @Delete('second-service-delete-post/:id')
  async deleteSecondServicePost(@Param() { id }) {
    return this.secondServiceService.deleteSecondServicePost(id);
  }

}
