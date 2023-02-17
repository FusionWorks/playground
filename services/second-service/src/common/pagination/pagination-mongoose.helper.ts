import { clone } from 'lodash';
import { Query } from 'mongoose';
import { DataWithPaginationDto } from './pagination.dto';

const defaultOptions = { limit: 10, offset: 0 };

export const paginate = async <T>(
  query: Query<any, T>,
  options = defaultOptions,
): Promise<DataWithPaginationDto<T>> => {
  const { limit, offset } = options;
  const _query = clone(query);

  const total = (Number)(await _query.count().exec());
  const data = await query
    .limit(limit!)
    .skip(offset)
    .exec();
  return { data, meta: { total, limit, offset } };
};
