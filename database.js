const { MongoClient } = require("mongodb");

const login = "root";
const password = "password";
const uri = "mongodb://" + login + ":" + password + "@localhost:27017";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
}

const getArticles = async () => {
    await client.connect();
    const database = client.db("blog");
    const collection = database.collection("articles");
    const result = await collection.find({}).toArray();
    if(result) {
        console.log("Found " + result.length + " articles \u{1F4F0}");
    } else {
        console.warn("Could not find any articles \u{1F43E}");
    }
    return result || "Could not find any articles \u{1F43E}"; 
}

const getArticle = async (uuid) => {
    await client.connect();
    const database = client.db("blog");
    const collection = database.collection("articles");
    const result = await collection.findOne({"uuid":uuid});
    if(result) {
        console.log("Found an article whith the uuid : " + uuid + " \u{1F4F0}");
    } else {
        console.warn("Could not find any articles \u{1F43E}");
    }
    return result || "Could not find any articles \u{1F43E}"; 
}

const createArticle  = async (article) => {
    article.uuid = createUUID();
    let result = {};
    try {
        await client.connect();
        const database = client.db("blog");
        const collection = database.collection("articles");
        result = await collection.insertOne(article);
    } finally {
        await client.close();
        if(result) {
            console.log("Created the article with the UUID : " + article.uuid + "\u{1F5DE}");
        } else {
            console.warn("Could not create the article with the UUID : " + article.uuid + "\u{1F43E}");
        }
        return result.ops || "Could not create the article with the UUID : " + article.uuid + "\u{1F43E}";
    }
}

const deleteArticle = async (uuid) => {
    await client.connect();
    const database = client.db("blog");
    const collection = database.collection("articles");
    const result = await collection.deleteOne({"uuid":uuid});
    if(result) {
        console.log("Deleted an article whith the uuid : " + uuid + " \u{1F4F0}");
    } else {
        console.warn("Could not find any articles \u{1F43E}");
    }
    return result || "Could not find any articles \u{1F43E}"; 
}

module.exports =  { getArticles, getArticle, createArticle, deleteArticle };