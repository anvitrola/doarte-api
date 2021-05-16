const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;

  User.create({
    email: email,
    name: name,
    password: bcrypt.hashSync(password, 8),
    amount_money: 1000,
    active: true,
  })
    .then((user) => {
      res.send("Usuário criado com sucesso!");
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) res.status(401).send({ message: "Email ou senha inválidos" });

      let isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).send({
          message: "Email ou senha inválidos",
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: "12h", //12h
      });

      res.status(200).send({
        id: user.id,
        email: user.email,
        acessToken: token,
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
