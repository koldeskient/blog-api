const { getArticleCollection } = require('../database/commons');

module.exports = (app) => {
    
    app.get("/articles", async (req, res) => {
        console.info("GET /articles --> \u{1F4E8}");
        try {
            const result = await getArticleCollection().getArticles();
            res.json(result);
        } catch(error) {
            const message = handleError(error);
            res.status(503);
            res.json(message);
        }
        console.info("GET /articles "+ res.statusCode +" <-- \u{1F4E6}");
    });
    app.get("/articles/:uuid", async (req, res) => {
        const uuid = req.params.uuid;
        console.info("GET /articles/"+ uuid +" \u{1F4E8}");
        try {
            const result = await getArticleCollection().getArticle(uuid);
            res.json(result);
        } catch(error) {
            const message = handleError(error);
            res.status(503);
            res.json(message);
        }
        console.info("GET /articles/"+ uuid +" "+ res.statusCode +" \u{1F4E6}");
    });
    app.post("/articles", async (req, res) => {
        console.info("POST /articles \u{1F4E8}");
        try {
            const article = req.body;
            const result = await getArticleCollection().createArticle(article);
            res.json(result);
        } catch(error) {
            const message = handleError(error);
            res.status(503);
            res.json(message);
        }
        console.info("POST /articles "+ res.statusCode +" \u{1F4E6}");
    });
    app.put("/articles/:uuid", async (req, res) => {
        const uuid = req.params.uuid;
        console.info("PUT /articles"+ uuid +" \u{1F4E8}");
        try {
            const article = req.body;
            const result = await getArticleCollection().updateArticle(uuid, article);
            res.json(result);
        } catch(error) {
            const message = handleError(error);
            res.status(503);
            res.json(message);
        }
        console.info("PUT /articles/"+ uuid +" \u{1F4E6}");
    });
    app.delete("/articles/:uuid", async (req, res) => {
        const uuid = req.params.uuid;
        console.info("DELETE /articles/"+ uuid +" \u{1F4E8}");
        try {
            const result = await getArticleCollection().deleteArticle(uuid);
            res.json(result);
        } catch(error) {
            const message = handleError(error);
            res.status(503);
            res.json(message);
        }
        console.info("DELETE /articles/"+ uuid +" "+ res.statusCode +" \u{1F4E6}");
    });

    function handleError(error) {
        let message = {
            code: 1,
            title: "Something happened",
            message: "An error occurred on the server."
        }
        if(error.message && error.message.includes("ECONNREFUSED")) {
            console.error("The REST API server could not connect to the database \u{1F6A7}");
            message = {
                code: 2,
                title: "Can't fetch the requested data",
                message: "The server could not get the data from the database, please report this to Eflamm."
            }
        } else if (error.message && error.message.includes("Topology is closed")) {
            console.error(error);
            console.error("The connection to the database was closed while writing data \u{1F6A7}");
            message = {
                code: 3,
                title: "Could not save the given data",
                message: "The server could not save the data in the database, please report this to Eflamm."
            }
        } else {
            console.error(error);
        }
        return message;
    }
}
