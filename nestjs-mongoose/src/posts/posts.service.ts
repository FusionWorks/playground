import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import CreatePostDto from './dto/create-post.dto';
import { Post, PostDocument } from './post.schema';
import { paginate } from '../common/pagination/pagination-mongoose.helper';
import { DataWithPaginationDto, PaginationParamsDto } from '../common/pagination/pagination.dto';
import PatchPostDto from './dto/patch-post.dto';
import UpdatePostDto from './dto/update-post.dto';

@Injectable()
class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) { }

  async findAll(paginationParams: PaginationParamsDto): Promise<DataWithPaginationDto<PostDocument>> {
    return paginate(this.postModel.find(), paginationParams);
  }

  async findOne(id: string): Promise<PostDocument> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  create(postData: CreatePostDto): Promise<PostDocument> {
    const createdPost = new this.postModel(postData);
    return createdPost.save();
  }

  async update(id: string, postData: UpdatePostDto): Promise<PostDocument> {
    const post = await this.postModel
      .findByIdAndUpdate(id, postData)
      .setOptions({ overwrite: true, new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async partialUpdate(id: string, postData: PatchPostDto): Promise<PostDocument> {
    const post = await this.postModel
      .findByIdAndUpdate(id, postData)
      .setOptions({ new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async delete(postId: string): Promise<PostDocument> {
    const result = await this.postModel.findByIdAndDelete(postId);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}

export default PostsService;
