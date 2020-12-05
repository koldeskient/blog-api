const { MongoClient } = require("mongodb");

const login = "root";
const password = "password";
const uri = "mongodb://" + login + ":" + password + "@localhost:27017";
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
let client;
let articlesCollection;
MongoClient.connect(uri, mongoOptions, (error, mongoClient) => {
    if(error) {
        return console.error("Failed to connect to the database \u{1F6A7} : " + error);
    }
    client = mongoClient;
    const database = client.db("blog");
    articlesCollection = database.collection("articles");
    console.info("Connected to the database \u{1F50C}")
});

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
}

const getArticles = async () => {
    try {
        const result = await articlesCollection.find({}).toArray();
        if(result) {
            console.log("   Found " + result.length + " articles \u{1F4F0}");
        } else {
            console.warn("  Could not find any articles \u{1F43E}");
        }
        return result || "Could not find any articles \u{1F43E}"; 
    } catch(error) {
        throw new Error(error);
    }
}

const getArticle = async (uuid) => {
    try {
        const result = await articlesCollection.findOne({"uuid":uuid});
        if(result) {
            console.log("   Found an article whith the uuid : " + uuid + " \u{1F5DE}");
        } else {
            console.warn("  Could not find any articles \u{1F43E}");
        }
        return result || "Could not find any articles \u{1F43E}"; 
    } catch(error) {
        throw new Error(error);
    }
}

const createArticle  = async (article) => {
    article.uuid = createUUID();
    try {
        const result = await articlesCollection.insertOne(article);
        if(result) {
            console.log("   Created the article with the UUID : " + article.uuid + "\u{1F5DE}");
        } else {
            console.warn("  Could not create the article with the UUID : " + article.uuid + "\u{1F43E}");
        }    
        return result.ops || "Could not create the article with the UUID : " + article.uuid + "\u{1F43E}";
    } catch(error) {
        throw new Error(error);
    }
}

const updateArticle = async (uuid, article) => {
    try {
        const result = await articlesCollection.updateOne({"uuid": uuid}, {"$set": article});
        if(result) {
            console.log("   Updated the article with the UUID : " + uuid + " \u{1F5DE}");
        } else {
            console.warn("  Could not update the article with the UUID : " + uuid + " \u{1F43E}");
        }
        return result.result || "Could not update the article with the UUID : " + uuid + " \u{1F43E}";
    } catch(error) {
        throw new Error(error);
    }
}

const deleteArticle = async (uuid) => {
    try {
        const result = await articlesCollection.deleteOne({"uuid":uuid});
        if(result) {
            console.log("   Deleted an article whith the uuid : " + uuid + " \u{1F5D1}");
        } else {
            console.warn("  Could not find any articles \u{1F43E}");
        }
        return result || "  Could not find any articles \u{1F43E}"; 
    } catch(error) {
        throw new Error(error);
    }
}

function handleExit(options) {
    if (options.cleanup) {
        client.close().then(console.info("Database connection closed \u{1F50C}"));
    };
    if (options.exit) process.exit();
}

// clear all the resources before exiting
process.on('exit', handleExit.bind(null, {cleanup:true}));
process.on('SIGINT', handleExit.bind(null, {exit:true}));
process.on('SIGUSR1', handleExit.bind(null, {exit:true}));
process.on('SIGUSR2', handleExit.bind(null, {exit:true}));

module.exports =  { getArticles, getArticle, createArticle, updateArticle, deleteArticle };