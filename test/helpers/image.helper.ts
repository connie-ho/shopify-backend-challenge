import { ObjectId } from 'bson';
import { ImageResult, Image } from '../../src/application/schema/types/schema';

const createMockImages = (data?: Partial<ImageResult>): ImageResult => {
  return {
    totalCount: 0,
    hasNextPage: false,
    cursor: null,
    results: [],
    ...data
  };
};

const createMockImage = (data?: Partial<Image>): Image => {
  return {
    "__typename": "Image",
    id: new ObjectId().toHexString(),
    url: 'url.png',
    tags: [{__typename: "Tag", id: new ObjectId().toHexString(), name: 'tomato'}],
    ...data
  };
};
export { createMockImages, createMockImage };
