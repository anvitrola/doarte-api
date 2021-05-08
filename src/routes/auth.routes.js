const express = require("express");
let router = express.Router();

const verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");


router.use((_, res,next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/api/auth/signUp", verifySignUp, controller.signUp);
router.post("/api/auth/signIn", controller.signIn);


module.exports = router;