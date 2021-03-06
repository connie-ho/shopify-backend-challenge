import { gql } from 'apollo-server';

const typeDefs = gql`
  type Image {
    id: ID!
    url: String!
    tags: [Tag!]!
  }

  type Query {
    images(input: QueryInput): ImageResult!
  }

  input ImagesQueryArgs {
    input: QueryInput
  }

  type Mutation {
    createImage(input: CreateImageInput): Image!
  }

  input CreateImageInput {
    url: String!
    tagNames: [String!]!
  }
`;

export { typeDefs };
