const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models");
const Users = db.Users;

exports.signUp = (req, res) => {
    const {name, email, password} = req.body;

    Users.create({
        email: email,
        name: name,
        password: bcrypt.hashSync(password, 8),
        amount_money:1000
    })
    .then(user => {
        res.send("Usuário criado com sucesso!")
    })
    .catch(err => res.status(500).send({message: err.message}))
}

exports.signIn = (req, res) => {
    const {email, password} = req.body;

    Users.findOne({
        where: {
            email: email
        }
    })
    .then(user => {
        if(!user)
            res.status(404).send({message: "E-mail não registrado"});

        let isPasswordValid = bcrypt.compareSync(
            password,
            user.password
        );

        if(!isPasswordValid) {
            return res.status(404).send({
                acessToken: null,
                message: "Senha inválida"
            });
        }

        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 43200 //12h
        });

        //Aqui deve entrar tb a lista de projetos do usuário
        res.status(200).send({
            id: user.id,
            email: user.email,
            acessToken: token
        });
    })
    .catch(err => res.status(500).send({message: err.message}))
}
