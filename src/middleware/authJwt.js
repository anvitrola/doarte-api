const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const Users = db.Users;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-acess-token"];

    if(!token) res.status(403).send({message: "Conexão insegura."});

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) res.status(401).send({message: "Não autorizado"});
        req.userId = decoded.id
        next();
    })
}

const authJwt = verifyToken;
module.exports = authJwt;