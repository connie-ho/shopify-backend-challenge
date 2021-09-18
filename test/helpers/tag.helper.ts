import { ObjectId } from 'bson';

import { Tag } from '../../src/application/schema/types/schema';

const createMockTag = (data?: Partial<Tag>): Tag => {
  return {
    id: new ObjectId().toHexString(),
    name: 'Tomato Sauce',
    priceCents: 250,
    ...data,
  };
};

export { createMockTag };
