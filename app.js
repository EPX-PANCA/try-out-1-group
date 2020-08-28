const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const routerIndex = require("./src/routes/IndexRouter");
const routerAuth = require("./src/routes/AuthRouter");
const routerUser = require("./src/routes/UserRouter");


app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

app.use("/", routerIndex);
app.use("/api/v1/user", routerUser);
app.use("/api/v1/auth", routerAuth);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})