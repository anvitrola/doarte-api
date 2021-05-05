const express = require("express");
const cors = require("cors");
const routeUser = require('./controllers/userController');
const routeCrowd = require('./controllers/crowdController');

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get("/", (req, res) => {
    res.send({"Doarte": "A Arte de Doar."});
})
routeUser(app);
routeCrowd(app);

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`[SUCCESS]: Example app listening at http://localhost:${port}`);
});


