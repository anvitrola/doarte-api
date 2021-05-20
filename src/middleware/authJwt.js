const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) res.status(401).send({ message: "Conexão insegura." });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) res.status(401).send({ message: "Não autorizado" });
    req.userId = decoded.id;

    next();
  });
};

const authJwt = verifyToken;
module.exports = authJwt;
