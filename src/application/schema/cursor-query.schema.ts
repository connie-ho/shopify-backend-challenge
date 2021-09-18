import { gql } from 'apollo-server';

const typeDefs = gql`
  input QueryInput {
    filter: [FilterInput!]
    sort: [SortInput!]
    limit: Int
    cursor: String
  }

  input SortInput {
    field: String!
    direction: SortDirection!
  }

  enum SortDirection {
    ASC
    DESC
  }

  input FilterInput {
    field: String!
    type: FilterValueType
    value: String
    values: [String!]
    operator: FilterOperator
  }

  enum FilterOperator {
    EQ
    NE
    LT
    LTE
    IN
    NIN
    GT
    GTE
  }

  enum FilterValueType {
    STRING
    NUMBER
    DATE
    OBJECT_ID
  }

  type ImageResult {
    results: [Image!]!
    totalCount: Int!
    hasNextPage: Boolean!
    cursor: ObjectID
  }
`;

export { typeDefs };
