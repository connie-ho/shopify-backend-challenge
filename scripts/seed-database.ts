import { MongoClient } from 'mongodb';
import { images, tags } from './initial-data';
import { Image, Tag } from '../src/entities/types';

require('dotenv').config();

const uri = process.env.MONGO_CONNECTION_STRING ?? '';
const dbName = process.env.DB_NAME;

let client = new MongoClient(uri);

const seedCollection = async (collectionName: string, data: Image[] | Tag[], index: any): Promise<void> => {
  try {
    console.log(`MongoDB is connecting to ${uri}`);

    client = await client.connect();

    const collection = client.db(dbName).collection(collectionName);

    console.log(`Destroying ${collectionName}...`);

    await collection.drop();

    console.log(`Seeding ${collectionName}...`);
    await collection.insertMany(data);
    await collection.createIndex(index);

    console.log(`Done seeding ${collectionName}.`);

    client.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

(async (): Promise<void> => {
  try {
    await seedCollection('images', images, {_id: 1});
    await seedCollection('tags', tags, {name: 1});
  } catch (error) {
    console.log(error);
  }
})();
