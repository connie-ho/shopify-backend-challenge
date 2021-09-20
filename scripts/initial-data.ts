import { ObjectId } from "bson";
import { Tag } from '../src/entities/types';

const words = [
  'writing',
  'poet',
  'meal',
  'disaster',
  'engineering',
  'climate',
  'awareness',
  'football',
  'lab',
  'distribution',
  'union',
  'presentation',
  'proposal',
  'temperature',
  'disk',
  'tale',
  'investment',
  'solution',
  'politics',
  'delivery',
  'initiative',
  'world',
  'response',
  'profession',
  'selection',
  'potato',
  'replacement',
  'criticism',
  'hat',
  'physics',
  'childhood',
  'sister',
  'guidance',
  'friendship',
  'committee',
  'army',
  'poetry',
  'message',
  'son',
  'weakness',
  'hearing',
  'argument',
  'city',
  'philosophy',
  'video',
  'goal',
  'wife',
  'revolution',
  'birthday',
  'affair',
]

const tags = words.map(word => ({ _id: new ObjectId(), name: word })) as unknown as Tag[]
const images = [] as any;

for(let i = 0; i < tags.length; i += 5) {
  const imgTags = words.slice(i, i + 5)

  images.push({
    _id: new ObjectId(),
    url: `https://loremflickr.com/320/240/${imgTags[0]},${imgTags[1]},${imgTags[2]},${imgTags[3]},${imgTags[4]}`,
    tagNames: imgTags
  })
}

export { images, tags }




