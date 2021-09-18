import { ObjectId, Collection } from 'mongodb';

import { FilterInput, Maybe, QueryInput, SortInput } from '../schema/types/schema';

const gqlToMongoSort = {
  DESC: -1,
  ASC: 1,
};

const gqlToMongoOperator = {
  EQ: '$eq',
  NE: '$ne',
  LT: '$lt',
  LTE: '$lte',
  IN: '$in',
  NIN: '$nin',
  GT: '$gt',
  GTE: '$gte',
};

const filterValueTypeConversion = {
  STRING: String,
  DATE: Date,
  NUMBER: Number,
  OBJECT_ID: ObjectId,
};

interface GetCursorResultsInput extends QueryInput {
  limit: number;
}

interface QueryResult {
  results: any;
  totalCount: number;
  hasNextPage: boolean;
  nextCursor: string;
}

class CursorProvider {
  collection: Collection;
  sortObj: any;
  filterObj: any;

  // generic to object function passed in
  constructor(collection: Collection) {
    this.collection = collection;
    this.sortObj = {};
    this.filterObj = {};
  }

  public async getCursorResults({ filter, sort, limit, cursor }: GetCursorResultsInput): Promise<QueryResult> {
    if (sort) this.getSortObject(sort);
    if (filter) this.getFilterObject(filter);

    const itemsToSkip = await this.getCursorIndex(cursor);
    let hasNextPage = false;

    const mongoDocuments = await this.collection
      .find(this.filterObj)
      .sort(this.sortObj)
      .skip(itemsToSkip)
      .limit(limit + 1)
      .toArray();

    if (mongoDocuments.length > limit) {
      hasNextPage = true;
      mongoDocuments.pop();
    }

    const nextCursor = mongoDocuments.length < limit ? null : mongoDocuments[limit - 1]._id;

    return {
      totalCount: mongoDocuments.length,
      hasNextPage,
      nextCursor,
      results: mongoDocuments,
    };
  }

  private getSortObject(sortArr: SortInput[]): void {
    for (const elem of sortArr) {
      this.sortObj[elem.field] = gqlToMongoSort[elem.direction];
    }
  }

  private getFilterObject(filterArr: FilterInput[]): void {
    for (const elem of filterArr) {
      let value = elem.value as any;
      let values = elem.values as any;

      if (elem.type) {
        const stringToTypeConverter = filterValueTypeConversion[elem.type];
        if (elem.value) {
          value = new stringToTypeConverter(elem.value);
        }
        if (elem.values) {
          values = elem.values.map((value) => new stringToTypeConverter(value));
        }
      }

      if (elem.operator) {
        if (!value) {
          throw new Error('Must provide a value with the operator');
        }
        this.filterObj[elem.field] = { [gqlToMongoOperator[elem.operator]]: value };
      } else {
        if (value) {
          this.filterObj[elem.field] = value;
        }
        if (values) {
          this.filterObj[elem.field] = { $in: values };
        }
      }
    }
  }

  private async getCursorIndex(cursor?: Maybe<string> | undefined): Promise<number> {
    if (!cursor) {
      return 0;
    }

    const items = await this.collection.find(this.filterObj).sort(this.sortObj).toArray();

    const cursorIndex = items.findIndex((item) => item._id.toString() === cursor);

    if (cursorIndex === -1) {
      throw new Error('No items found');
    }

    return cursorIndex + 1;
  }
}

export { gqlToMongoSort, gqlToMongoOperator, CursorProvider };
