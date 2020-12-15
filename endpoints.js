const { getQueries } = require('./database/connection');

const addEnpoints = (app, type) => {
    app.get("/"+ type, async (req, res) => {
        console.info("GET /"+type+" --> \u{1F4E8}");
        try {
            const result = await getQueries()[type].getAll();
            res.json(result);
        } catch(error) {
            const message = handleError(error);
            res.status(503);
            res.json(message);
        }
        console.info("GET /"+type+" "+ res.statusCode +" <-- \u{1F4E6}");
    });
    app.get("/"+type+"/:uuid", async (req, res) => {
        const uuid = req.params.uuid;
        console.info("GET /"+type+"/"+ uuid +" \u{1F4E8}");
        try {
            const result = await getQueries()[type].getOne(uuid);
            res.json(result);
        } catch(error) {
            const message = handleError(error);
            res.status(503);
            res.json(message);
        }
        console.info("GET /"+type+"/"+ uuid +" "+ res.statusCode +" \u{1F4E6}");
    });
    app.post("/"+type+"", async (req, res) => {
        console.info("POST /"+type+" \u{1F4E8}");
        try {
            const entity = req.body;
            const result = await getQueries()[type].createOne(entity);
            res.json(result);
        } catch(error) {
            const message = handleError(error);
            res.status(503);
            res.json(message);
        }
        console.info("POST /"+type+"s "+ res.statusCode +" \u{1F4E6}");
    });
    app.put("/"+type+"/:uuid", async (req, res) => {
        const uuid = req.params.uuid;
        console.info("PUT /"+type+""+ uuid +" \u{1F4E8}");
        try {
            const entity = req.body;
            const result = await getQueries()[type].updateOne(uuid, entity);
            res.json(result);
        } catch(error) {
            const message = handleError(error);
            res.status(503);
            res.json(message);
        }
        console.info("PUT /"+type+"/"+ uuid +" \u{1F4E6}");
    });
    app.delete("/"+type+"/:uuid", async (req, res) => {
        const uuid = req.params.uuid;
        console.info("DELETE /"+type+"/"+ uuid +" \u{1F4E8}");
        try {
            const result = await getQueries()[type].deleteOne(uuid);
            res.json(result);
        } catch(error) {
            const message = handleError(error);
            res.status(503);
            res.json(message);
        }
        console.info("DELETE /"+type+"/"+ uuid +" "+ res.statusCode +" \u{1F4E6}");
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

    return app;
};

module.exports = addEnpoints;
