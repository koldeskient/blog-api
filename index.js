const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

let app = express();

app.listen(3000, () => {
    console.log("REST API server started, listening on port 3000 \u{1F680}");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app = require('./endpoints')(app, "articles");
app = require('./endpoints')(app, "resumes");