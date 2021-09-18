import { setupDb } from '../database';
import { CursorProvider } from './cursor.provider';
import { ImageProvider } from './image.provider';
import { TagProvider } from './tag.provider';

const db = setupDb();
const imageCursorProvider = new CursorProvider(db.collection('images'));
const imageProvider = new ImageProvider(db.collection('images'), imageCursorProvider);

const tagProvider = new TagProvider(db.collection('tags'));

export { imageProvider, imageCursorProvider, tagProvider };
