import { gql } from 'apollo-server-core';
import { ApolloClient } from 'apollo-client';

import { createMockImage, createMockImages } from '../helpers/image.helper';
import { TestClient } from '../helpers/client.helper';
import { imageResolver } from '../../src/application/resolvers/image.resolver';
import { imageProvider, tagProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';
import { createMockTag } from '../helpers/tag.helper';

// @ts-ignore
let client: ApolloClient | unknown;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockImage1 = createMockImage();
const mockTag = createMockTag();
const mockImage2 = createMockImage({tags: [mockTag]});

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, imageResolver);
});

describe('imageResolver', (): void => {
  describe('getImages', () => {
    const query = gql`
      query getImages {
        images {
          results {
            id
            url
            tags {
              id
              name
            }
          }
        }
      }
    `;
    test('should retrieve all images in the database if no filters are specified', async () => {

      const mockImages = createMockImages({
        totalCount: 2,
        results: [mockImage1, mockImage2],
      })

      jest.spyOn(imageProvider, 'getImages').mockResolvedValue(mockImages);

      const result = await client.query({ query });
      expect(result.data).toEqual({
        images: {
          __typename: 'ImageResult',
          results: [
            {
              __typename: 'Image',
              id: mockImage1.id,
              url: mockImage1.url,
              tags: mockImage1.tags,
            },
            {
              __typename: 'Image',
              id: mockImage2.id,
              url: mockImage2.url,
              tags: mockImage2.tags,
            }
          ]
        },
      });

    });

    test('should return the correct images when the filter tag is used', async () => {
      const variables = {
        input: {
          filter:
            {
              field: 'tags',
              values: ['tomato']
            }
        }
      }

      const mockImages = createMockImages({
        totalCount: 1,
        results: [mockImage1],
      })

      jest.spyOn(imageProvider, 'getImages').mockResolvedValue(mockImages);

      const result = await client.query({ query, variables });
      expect(result.data).toEqual({
        images: {
          __typename: 'ImageResult',
          results: [
            {
              __typename: 'Image',
              id: mockImage1.id,
              url: mockImage1.url,
              tags: mockImage1.tags,
            },
          ]
        },
      });
    });
  });

  describe('createImage', () => {
    const mutation = gql`
      mutation createImage($createImageInput: CreateImageInput!) {
        createImage(input: $createImageInput) {
          id
          url
          tags {
            id
            name
          }
        }
      }

    `;
    test('should create a new image', async () => {
      jest.spyOn(imageProvider, 'createImage').mockResolvedValue(mockImage1);
      jest.spyOn(tagProvider, 'validateTags').mockResolvedValue();

      const variables = {
        createImageInput: {
          url: "newImage.png",
          tagNames: ["tomato"]
        }
      }

      const result = await client.mutate({ mutation, variables });
      expect(result.data).toEqual({
        createImage: {
          __typename: 'Image',
          id: mockImage1.id,
          url: mockImage1.url,
          tags: mockImage1.tags,
        },
      });

      expect(tagProvider.validateTags).toHaveBeenCalledWith(variables.createImageInput.tagNames)
    });

  });

});
