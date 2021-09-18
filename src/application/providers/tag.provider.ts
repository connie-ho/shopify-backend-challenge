import { Collection } from 'mongodb';

import { TagDocument } from '../../entities/types';
import { toTagObject } from '../../lib/object-formatter';
import { Tag } from '../schema/types/schema';

class TagProvider {
  constructor(private collection: Collection) {}

  public async getTagsByName(names: string[]): Promise<Tag[]> {
    const data = (await this.collection
      .find({ name: { $in: names } })
      .toArray()) as TagDocument[];

    const tags = data.map(tag => toTagObject(tag))

    return tags
  }
}

export { TagProvider };
