const db = require("../models");
const User = db.User;

const checkDuplicateEmail = (req, res, next) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        user? res.status(400).send({message: "Usuário já cadastrado."}):next();
    })
}

const verifySignUp = checkDuplicateEmail;
module.exports = verifySignUp;