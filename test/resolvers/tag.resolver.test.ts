import { gql } from 'apollo-server-core';
import { ApolloClient } from 'apollo-client';

import { createMockTag } from '../helpers/tag.helper';
import { TestClient } from '../helpers/client.helper';
import { tagResolver } from '../../src/application/resolvers/tag.resolver';
import { tagProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';

// TODO: add running tests to ci.yml so that they run in Github whenever you update branches
// TODO: fix this type:
// @ts-ignore
let client: ApolloClient | unknown;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockTag = createMockTag();

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, tagResolver);
});

describe('tagResolver', (): void => {
  describe('getTag', () => {
    const query = gql`
      query Get_Tag($tag: ObjectID!) {
        tag(id: $tag) {
          id
          name
          priceCents
        }
      }
    `;
    test('should retrieve a tag when passed an existing tag id', async () => {
      const variables = { tag: mockTag.id };

      jest.spyOn(tagProvider, 'getTag').mockResolvedValue(mockTag);

      const result = await client.query({ query, variables });

      expect(result.data).toEqual({
        tag: {
          __typename: 'Tag',
          id: mockTag.id,
          name: mockTag.name,
          priceCents: mockTag.priceCents,
        },
      });

      expect(tagProvider.getTag).toHaveBeenCalledWith(mockTag.id);
    });
    test('should throws an error when passed an undefined tag id', async () => {
      const variables = { tag: undefined };

      jest.spyOn(tagProvider, 'getTag').mockResolvedValue(mockTag);

      await expect(client.query({ query, variables })).rejects.toThrow(
        'GraphQL error: Variable "$tag" got invalid value undefined; Expected non-nullable type "ObjectID!" not to be null.'
      );
    });
  });
});
