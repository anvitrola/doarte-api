const {authJwt} = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = app => {
    app.use((req, res, next) => {
        res.header(
            "Access-Controll-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard)
}