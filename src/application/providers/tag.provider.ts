import { Collection, ObjectId } from 'mongodb';

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

  public async validateTags(tagNames: string[]): Promise<void> {
    const existingTags = await this.collection.find({ name: { $in: tagNames } }).map(tag => tag.name).toArray();

    const newTags = tagNames.filter(tag => !existingTags.includes(tag));
    const tags = newTags.map((tag: string) => ({
      _id: new ObjectId(),
      name: tag
    }))

    await this.collection.insertMany(tags);
  }
}

export { TagProvider };
