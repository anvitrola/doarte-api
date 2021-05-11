const db = require("../models");
const Users = db.Users;
const bcrypt = require("bcryptjs");
exports.allAccess = (req, res) => {
    res.status(200).send({message: "Conteúdo público"});
}

exports.userBoard = (req, res) => {
    res.status(200).send({message: "Conteúdo pessoal"});
}

exports.updateUser =async (req, res) => {
    const id = res.locals.userId;
    const {name, email, password} = req.body;
    await Users.update({email: email,
        name: name,
        password: bcrypt.hashSync(password, 8)}, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Usuário Atualizado!"
            });
        } else {
            res.send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating User with id=" + id
        });
    });
};


exports.deleteUser =async (req, res) => {
    const id = res.locals.userId;
   
    await Users.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Usuário deletado!"
            });
        } else {
            res.send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error deleting User with id=" + id
        });
    });
};