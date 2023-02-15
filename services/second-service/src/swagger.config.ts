import { ApiParam, ApiQuery } from '@nestjs/swagger';

export const swaggerConfig = {
  query: {
    limit: ApiQuery({
      name: 'limit',
      description: 'Limit the number of results',
      example: 10,
    }),
    offset: ApiQuery({
      name: 'offset',
      description: 'Offset the results by a certain amount',
      example: 0,
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
