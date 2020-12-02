const express = require('express');
const {run} = require('./database.js');

const app = express();

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

const articles = [
    {
        uuid: "1234",
        title: "Hello wordl",
        body: "lorem ipsum"
    }
];

app.get("/articles", (req, res) => {
    res.json(articles);
});
app.post("/articles", (req, res) => {
    res.send("POST request");
});

run().catch(console.dir);