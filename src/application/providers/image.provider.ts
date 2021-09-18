import { Collection} from 'mongodb';
import { ImageResult, ImagesQueryArgs } from '../schema/types/schema';
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
    console.log(args)
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
}

export { ImageProvider };
