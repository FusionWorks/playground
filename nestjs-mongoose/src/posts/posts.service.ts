import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto, UpdatePostDto } from './dto/create-update-posts.dto';
import { Post, PostDocument } from './post.schema';
import { paginate } from '../common/pagination/pagination-mongoose.helper';
import { PaginationParamsDto } from '../common/pagination/pagination.dto';

@Injectable()
class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(paginationParams: PaginationParamsDto) {
    return paginate(this.postModel.find(), paginationParams);
  }

  async findOne(id: string) {
    const post = await this.postModel.findOne({ id });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  create(postData: CreatePostDto) {
    const createdPost = new this.postModel(postData);
    return createdPost.save();
  }

  async update(id: string, postData: CreatePostDto) {
    const post = await this.postModel
      .findByIdAndUpdate(id, postData)
      .setOptions({ overwrite: true, new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async partialUpdate(id: string, postData: UpdatePostDto) {
    const post = await this.postModel
      .findByIdAndUpdate(id, {
        $set: postData,
      })
      .setOptions({ overwrite: true, new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async delete(postId: string) {
    const result = await this.postModel.findByIdAndDelete(postId);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}

export default PostsService;
