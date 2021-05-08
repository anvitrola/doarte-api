const db = require("../models");
const Users = db.Users;

const checkDuplicateEmail = (req, res, next) => {

    Users.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(user) {
            res.status(400).send({
                message: "Usuário já cadastrado."
            });
            return;
        }
    })

    next();
}

const verifySignUp = checkDuplicateEmail;
module.exports = verifySignUp;