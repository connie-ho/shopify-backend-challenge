import { Tag } from '../schema/types/schema';
import { tagProvider } from '../providers';

const tagResolver = {
  Image: {
    tags: async (image: { tagNames: string[] }): Promise<Tag[]> => {

      if (!image.tagNames) {
        throw new Error(`Tag names required`);
      }

      return tagProvider.getTagsByName(image.tagNames);
    },
  },
};

export { tagResolver };
