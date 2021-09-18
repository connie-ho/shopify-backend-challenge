import { Tag } from '../schema/types/schema';
import { tagProvider } from '../providers';

const tagResolver = {
  Image: {
    tags: async (image: { tags: string[] }): Promise<Tag[]> => {

      if (!image.tags) {
        throw new Error(`Tag names required`);
      }

      return tagProvider.getTagsByName(image.tags);
    },
  },
};

export { tagResolver };
