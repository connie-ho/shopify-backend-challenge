# Shopify Challenge - Backend Image Repository

## Summary
This application allows you to create and search for images in a database by specifying sort, filter and cursor parameters.

## Getting Started

1. Clone this repo
2. In the root folder, run `npm install` to install all dependencies
3. Setup a mongodb database either by:
    a. Creating a cluster on [atlas](https://www.mongodb.com/cloud/atlas)
    b. Running `docker-compose up`
4. Fill the `.env` file with the appropriate connection string
    * If running locally, the connection string will be: MONGO_CONNECTION_STRING=mongodb://localhost:27017/<dbName>
5. Run `npm run seed:database` to seed the database
6. Run `npm start` in the root folder to start the server

### Notes:
* If modifying the schema, ensure you `npm run generate:types` to update the generated schema file
* `npm run test` will run the entire test suite

# Future Work
* Create a client to interface with the server
* Add logic to upload images from the client to a cloud storage (e.g. S3) then upload the S3 url to the image database
* Integrate Amazon Rekognition or Google Vision to obtain the tags automagically, and store those in the database for the client
