import { gql } from 'apollo-server-core';

import { typeDefs as imageTypeDefs } from './image.schema';
import { typeDefs as tagTypeDefs } from './tag.schema';
import { typeDefs as paginationQueryTypeDefs } from './cursor-query.schema';

const scalarSchema = gql`
  scalar ObjectID
`;

const typeDefs = gql`
  ${scalarSchema}
  ${paginationQueryTypeDefs}
  ${imageTypeDefs}
  ${tagTypeDefs}
`;

export { typeDefs };
