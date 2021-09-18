import { ObjectID, Document } from "bson";

export interface Image {
  _id: ObjectID;
  url: string;
  tags: string[];
}

export interface Tag {
  _id: ObjectID;
  name: string;
}

export interface TagDocument extends Document, Tag {}
export interface ImageDocument extends Document, Image {}
