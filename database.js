const { MongoClient } = require("mongodb");

const login = "root";
const password = "password";
const uri = "mongodb://" + login + ":" + password + "@localhost:27017";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const run  = async () => {
    try {
        await client.connect();

        const database = client.db("blog");
        const collection = database.collection("articles");

        const query = {title: "Hello world"};
        const article = await collection.findOne(query);

        console.log(article);
    } finally {
        await client.close();
    }
}

module.exports =  { run };