const express = require('express');
const bodyParser = require('body-parser');
const { getArticles, getArticle, createArticle, deleteArticle} = require('./database.js');

const app = express();

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/articles", async (req, res) => {
    console.log("GET /articles \u{1F4E8}");
    const result = await getArticles();
    res.json(result);
    console.log("GET /articles \u{1F4E6}");
});
app.get("/articles/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    console.log("GET /articles/"+ uuid +" \u{1F4E8}");
    const result = await getArticle(uuid);
    res.json(result);
    console.log("GET /articles/"+ uuid +" \u{1F4E6}");
});
app.post("/articles", async (req, res) => {
    console.log("POST /articles \u{1F4E8}");
    const article = req.body;
    const result = await createArticle(article);
    res.json(result);
    console.log("POST /articles \u{1F4E6}");
});
app.delete("/articles/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    console.log("DELETE /articles/"+ uuid +" \u{1F4E8}");
    const result = await deleteArticle(uuid);
    res.json(result);
    console.log("DELETE /articles/"+ uuid +" \u{1F4E6}");
});