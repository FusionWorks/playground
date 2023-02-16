import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import CreatePostsDto from './dto/create-posts.dto';
import { Post, PostDocument } from './post.schema';

@Injectable()
class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async countDocuments() {
    return this.postModel.countDocuments().exec();
  }

  async findAll(limit, offset) {
    return this.postModel.find().limit(limit).skip(offset).exec();
  }

  async findAllWithTotal(limit: number, offset: number) {
    const data = await this.findAll(limit, offset);
    const total = await this.countDocuments();
    return { data, total };
  }

  async findOne(id: string) {
    const post = await this.postModel.findOne({ id });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  create(postData: CreatePostsDto) {
    const createdPost = new this.postModel(postData);
    return createdPost.save();
  }

  async update(id: string, postData: CreatePostsDto) {
    const post = await this.postModel
      .findByIdAndUpdate(id, postData)
      .setOptions({ overwrite: true, new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async partialUpdate(id: string, postData: CreatePostsDto) {
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
