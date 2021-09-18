import { createHash } from 'crypto';
import { ObjectId } from 'bson';

const deterministicId = (data: string): ObjectId => {
  const hash = createHash('sha1').update(data).digest('hex').slice(0, 24);

  return new ObjectId(hash);
};

export default deterministicId;
