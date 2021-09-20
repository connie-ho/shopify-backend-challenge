import {
  CreateImageInput,
  ImagesQueryArgs,
} from '../schema/types/schema';

import { ImageQueryResult } from '../providers/image.provider';
import { imageProvider, tagProvider } from '../providers';
import { ImageObject } from 'src/lib/object-formatter';

const imageResolver = {
  Query: {
    images: async (_: any, args: ImagesQueryArgs): Promise<ImageQueryResult> => {
      return imageProvider.getImages(args);
    },
  },

  Mutation: {
    createImage: async (_: any, args: { input: CreateImageInput }): Promise<ImageObject> => {
      const { url, tagNames } = args.input;

      if (!(url || url.trim() || tagNames.length)) {
        throw new Error(`Url and at least 1 tag required to save an image to the database`);
      }

      await tagProvider.validateTags(tagNames);
      return imageProvider.createImage(args);
    },
  }
};

export { imageResolver };
