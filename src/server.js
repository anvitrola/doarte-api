const express = require("express");
const cors = require("cors");
const db = require("./models");
const authRoutes = require("./routes/auth.routes");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(authRoutes);

db.sequelize.sync({alter: true});


// TODO configurar rotas
// require("./routes/auth.routes.js")(app);
// require("./routes/user.routes.js")(app);

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`[SUCCESS]: Server is running at http://localhost:${port}`);
});
