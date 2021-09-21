import { Collection, ObjectId} from 'mongodb';
import { CreateImageInput, ImageResult, ImagesQueryArgs } from '../schema/types/schema';
import { ImageObject, toImageObject } from '../../lib/object-formatter';
import { CursorProvider } from './cursor.provider';
import { ImageDocument } from '../../entities/types';

type OmittedQueryResult = Omit<ImageResult, 'results'>;
export interface ImageQueryResult extends OmittedQueryResult {
  results: ImageObject[];
}

class ImageProvider {
  constructor(private collection: Collection, private imageCursorProvider: CursorProvider) {}

  public async getImages(args: ImagesQueryArgs): Promise<ImageQueryResult> {

    if (!args.input) {
      const data = (await this.collection.find().toArray()) as ImageDocument[];

      const images = data.map(toImageObject);
      return {
        totalCount: images.length,
        hasNextPage: false,
        results: images,
      };
    }

    const { filter, sort, cursor, limit } = args.input;

    const { totalCount, hasNextPage, nextCursor, results } = await this.imageCursorProvider.getCursorResults({
      filter,
      sort,
      cursor,
      limit: limit ?? 10,
    });

    return {
      totalCount,
      hasNextPage,
      cursor: nextCursor,
      results: results.map(toImageObject),
    };
  }

  public async createImage(args: { input: CreateImageInput }): Promise<ImageObject> {
    const createImageObject = {
      ...args.input,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const imageData = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $set: createImageObject },
      { upsert: true, returnDocument: 'after' }
    );

    const image = imageData.value as ImageDocument;

    if (!image) {
      throw new Error(`Could not create the ${name} image`);
    }

    return toImageObject(image);
  }


}

export { ImageProvider };
