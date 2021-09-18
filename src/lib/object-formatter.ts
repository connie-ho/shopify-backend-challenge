
import { ImageDocument, TagDocument } from '../entities/types';
import { Tag } from '../application/schema/types/schema'

export interface ImageObject extends Omit<ImageDocument, 'tags'>{}

const toImageObject = (image: ImageDocument): ImageObject => {
  return {
    id: image._id.toHexString(),
    url: image.url,
    tags: image.tags
  };
};

const toTagObject = (tag: TagDocument): Tag => {
  return {
    id: tag._id.toHexString(),
    name: tag.name,
  };
};

export { toTagObject, toImageObject };
