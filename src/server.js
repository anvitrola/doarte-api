const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

require("./routes/user.routes")(app);
require("./routes/auth.routes.js")(app);
require("./routes/product.routes.js")(app);

db.sequelize.sync({alter: true});

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`[SUCCESS]: Server is running at http://localhost:${port}`);
});
