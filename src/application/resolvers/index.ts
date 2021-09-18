import { merge } from 'lodash';

import { imageResolver } from './image.resolver';
import { tagResolver } from './tag.resolver';

const resolvers = merge(imageResolver, tagResolver);

export { resolvers };
