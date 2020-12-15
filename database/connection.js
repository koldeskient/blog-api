const { MongoClient } = require("mongodb");
const { queries } = require("./queries.js");

const login = "root"; 
const password = "password";
const uri = "mongodb://" + login + ":" + password + "@localhost:27017";
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

let database = {};
let mongoClient;
MongoClient.connect(uri, mongoOptions, (error, mc) => {
    // TODO enable reconnect
    if(error) {
        return console.error("Failed to connect to the database \u{1F6A7} : " + error);
    }
    mongoClient = mc;
    const db = mongoClient.db("blog");
    database.articles = queries(db, "articles", "\u{1F5DE}");
    database.resumes = queries(db, "resumes", "\u{1F3C6}");
    console.info("Connected to the database \u{1F50C}"); 
});

const getQueries = () => {
    return database;
}

function handleExit(options) {
    if (options.cleanup && mongoClient) {
        mongoClient.close().then(console.info("Database connection closed \u{1F50C}"));
    };
    if (options.exit) process.exit();
}

// clear all the resources before exiting
process.on('exit', handleExit.bind(null, {cleanup:true}));
process.on('SIGINT', handleExit.bind(null, {exit:true}));
process.on('SIGUSR1', handleExit.bind(null, {exit:true}));
process.on('SIGUSR2', handleExit.bind(null, {exit:true}));

module.exports =  { getQueries };