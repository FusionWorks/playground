import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import CreatePostsDto from './dto/create-posts.dto';
import { Post, PostDocument, postForFeature } from './post.schema';
import PostsService from './posts.service';
import { PaginationParamsDto } from '../common/pagination/pagination.dto';
import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { DataWithPaginationDto } from '../common/pagination/pagination.dto';
import { rootMongooseTestModule } from '../test-utils/mongo/root-mongoose-test.module';

describe('PostsService', () => {
  let service: PostsService;
  let model: Model<PostDocument>;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([postForFeature]),
      ],
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
    model = module.get<Model<PostDocument>>(getModelToken(Post.name));
  });

  describe('findAll', () => {
    it('should return paginated posts', async () => {
      const posts: Partial<PostDocument>[] = [];
      for (let i = 0; i < 20; i++) {
        const postData: CreatePostsDto = { title: `Post ${i}`, content: `Content ${i}` };
        const post = await model.create(postData);
        posts.push({ id: post._id, ...postData });
      }

      const paginationParams: PaginationParamsDto = {
        limit: 10,
        offset: 0,
      };

      const expectedData = posts.slice(0, 10);
      const expectedMeta = {
        total: 20,
        limit: paginationParams.limit,
        offset: paginationParams.offset,
      };
      const expectedResult: DataWithPaginationDto<Partial<Post>> = {
        data: expectedData,
        meta: expectedMeta,
      };

      const result = await service.findAll(paginationParams);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return the specified post', async () => {
      const post = await model.create({ title: 'Post Title', content: 'Post Content' });
      const result = await service.findOne(post._id);
      expect(result).toEqual(post);
    });

    it('should throw a NotFoundException if the post is not found', async () => {
      await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return the new post', async () => {
      const postData: CreatePostsDto = { title: 'New Post Title', content: 'New Post Content' };
      const result = await service.create(postData);
      expect(result).toMatchObject(postData);
    });
  });

})