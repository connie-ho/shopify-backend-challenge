import { ObjectId } from 'bson';
import { Tag } from '../../src/application/schema/types/schema';

const createMockTag = (data?: Partial<Tag>): Tag => {
  return {
    __typename: "Tag",
    id: new ObjectId().toHexString(),
    name: 'potato',
    ...data
  };
};
export { createMockTag };
