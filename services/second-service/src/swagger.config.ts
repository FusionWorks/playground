import { ApiParam, ApiQuery } from '@nestjs/swagger';

export const swaggerConfig = {
  query: {
    perPage: ApiQuery({
      name: 'perPage',
      description: 'Limit the number of results per page',
      example: 10,
    }),
    page: ApiQuery({
      name: 'page',
      description: 'Page',
      example: 1,
      required: false,
    }),
  },
  param: {
    id: ApiParam({
      name: 'id',
      type: 'string',
      description: 'The ID of the post',
    }),
  },
  body: {
    example: {
      title: 'Example Title',
      content: 'Example Content',
    },
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Example Title',
        },
        content: {
          type: 'string',
          example: 'Example Content',
        },
      },
      required: ['title', 'content'],
    },
  },
};
