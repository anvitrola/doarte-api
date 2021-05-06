const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

await db.sequelize.sync({alter: true});

require("./routes/auth.routes.js")(app);
require("./routes/user.routes.js")(app);

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`[SUCCESS]: Server is running at http://localhost:${port}`);
});


