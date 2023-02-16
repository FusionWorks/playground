import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import CreatePostsDto from './dto/create-posts.dto';
import { Post, PostDocument } from './post.schema';

@Injectable()
class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {
  }

  async findAll(page, perPage) {
    const data = await this.postModel
      .find()
      .limit(perPage!)
      .skip(perPage! * (page! - 1))
      .exec();
    const total = await this.postModel.countDocuments().exec();
    const lastPage = Math.ceil(total / perPage!);
    return { data, metadata: { total, perPage, page, lastPage } };
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
