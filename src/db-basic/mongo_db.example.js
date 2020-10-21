const path = require('path')
require("dotenv").config({ path: path.join(__dirname, ".env") });


const {promisify} = require('util')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = process.env.MONGO_DB_NAME_PROJECT;
const url = process.env.MONGO_DB_URL;

const connectionPromise = promisify(MongoClient.connect.bind(MongoClient))

async function main() {

 const connection = await connectionPromise(url);
 const db = connection.db(dbName);
 const exampleCollection = db.collection('example');
//  await exampleCollection.insertOne({
//    name: "hello",
//    number: 5
//  })

 console.log(await exampleCollection.find().toArray()) //findOne({name:"hell1o"})монго дб оператори
//  console.log(await exampleCollection.find(). //.find({$gte:2, $lte:5}).toArray()
console.log(await exampleCollection.find().toArray()) 


};
main()
