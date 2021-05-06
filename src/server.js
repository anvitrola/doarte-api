const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

await db.sequelize.sync({alter: true});

app.get("/", (req, res) => {
    res.send({"Doarte": "A Arte de Doar."});
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`[SUCCESS]: Server is running at http://localhost:${port}`);
});


