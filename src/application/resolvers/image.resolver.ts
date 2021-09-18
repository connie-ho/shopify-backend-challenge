import {
  ImagesQueryArgs,
} from '../schema/types/schema';

import { ImageQueryResult } from '../providers/image.provider';
import { imageProvider } from '../providers';

const imageResolver = {
  Query: {
    images: async (_: any, args: ImagesQueryArgs): Promise<ImageQueryResult> => {
      return imageProvider.getImages(args);
    },
  },
};

export { imageResolver };
