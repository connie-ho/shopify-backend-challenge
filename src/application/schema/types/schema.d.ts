export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Long: any;
  ObjectID: any;
};

export type CreateImageInput = {
  tagNames: Array<Scalars['String']>;
  url: Scalars['String'];
};

export type FilterInput = {
  field: Scalars['String'];
  operator?: Maybe<FilterOperator>;
  type?: Maybe<FilterValueType>;
  value?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Scalars['String']>>;
};

export enum FilterOperator {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  In = 'IN',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE',
  Nin = 'NIN',
}

export enum FilterValueType {
  Date = 'DATE',
  Number = 'NUMBER',
  ObjectId = 'OBJECT_ID',
  String = 'STRING',
}

export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  tags: Array<Tag>;
  url: Scalars['String'];
};

export type ImageResult = {
  __typename?: 'ImageResult';
  cursor?: Maybe<Scalars['ObjectID']>;
  hasNextPage: Scalars['Boolean'];
  results: Array<Image>;
  totalCount: Scalars['Int'];
};

export type ImagesQueryArgs = {
  input?: Maybe<QueryInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createImage: Image;
};

export type MutationCreateImageArgs = {
  input?: Maybe<CreateImageInput>;
};

export type Query = {
  __typename?: 'Query';
  images: ImageResult;
};

export type QueryImagesArgs = {
  input?: Maybe<QueryInput>;
};

export type QueryInput = {
  cursor?: Maybe<Scalars['String']>;
  filter?: Maybe<Array<FilterInput>>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type SortInput = {
  direction: SortDirection;
  field: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
};
