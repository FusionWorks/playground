import { clone } from 'lodash';
import { Query } from 'mongoose';

const defaultOptions = { perPage: 10, page: 1 };

export const findAllWithPagination = async <T>(
  query: Query<any, T>,
  options = defaultOptions,
) => {
  const { perPage, page } = options;
  const _query = clone(query);

  const total = await _query.count().exec();
  const lastPage = Math.ceil(total / perPage!);
  const data = await query
    .limit(perPage!)
    .skip(perPage! * (page! - 1))
    .exec();
  return { data, metadata: { total, perPage, page, lastPage } };
};
