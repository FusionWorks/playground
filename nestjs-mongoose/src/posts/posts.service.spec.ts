import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import CreatePostDto from './dto/create-post.dto';
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
        const postData: CreatePostDto = { title: `Post ${i}`, content: `Content ${i}` };
        const post = await model.create(postData);
        posts.push({ id: post.id, ...postData });
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

      const { meta, data } = await service.findAll(paginationParams);
      const resultData = data.map(({ id, title, content }) => ({ id: id, title, content }));
      expect({ meta, data: resultData }).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return the specified post', async () => {
      const post = await model.create({ title: 'Post Title', content: 'Post Content' });
      const result = await service.findOne(post.id);
      expect(result.toObject()).toEqual(post.toObject());
    });

    it('should throw a NotFoundException if the post is not found', async () => {
      await expect(service.findOne(new mongoose.Types.ObjectId().toString())).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return the new post', async () => {
      const postData: CreatePostDto = { title: 'New Post Title', content: 'New Post Content' };
      const result = await service.create(postData);
      expect(result).toMatchObject(postData);
    });
  });

  describe('update', () => {
    it('should update the specified post', async () => {
      // Create a new post
      const post = await service.create({
        title: 'Test Post',
        content: 'This is a test post.',
      });

      const update = {
        title: 'Updated Test Post',
        content: 'This is an updated test post.',
      }

      // Update the post
      await service.update(post.id, update);

      const updatedPost = await service.findOne(post.id);

      // Check that the post was updated
      expect({
        id: updatedPost.id,
        title: updatedPost.title,
        content: updatedPost.content,
      }).toEqual({
        id: post.id,
        ...update,
      });

      // This check are failing because of https://github.com/Automattic/mongoose/issues/9899
      //expect(updatedPost.createdAt.getTime()).toStrictEqual(post.createdAt.getTime());
      //expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(updatedPost.createdAt.getTime());

    });
  });

  describe('partialUpdate', () => {
    it('should update the specified post', async () => {

      const initial = {
        title: 'Test Post',
        content: 'This is a test post.',
      }

      // Create a new post
      const post = await service.create(initial);

      const update = {
        title: 'Updated Test Post',
      }

      // Update the post
      await service.partialUpdate(post.id, update);

      const updatedPost = await service.findOne(post.id);

      // Check that the post was updated
      expect({
        id: updatedPost.id,
        title: updatedPost.title,
        content: updatedPost.content,
      }).toEqual({
        id: post.id,
        ...initial,
        ...update,
      });

      expect(updatedPost.createdAt.getTime()).toStrictEqual(post.createdAt.getTime());
      expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(updatedPost.createdAt.getTime());

    });
  });
});

