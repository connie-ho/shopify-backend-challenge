import { gql } from 'apollo-server';

const typeDefs = gql`
  type Tag {
    id: ID!
    name: String!
  }
`;

export { typeDefs };
