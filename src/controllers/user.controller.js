const db = require("../models");
const bcrypt = require("bcryptjs");
const Users = db.Users;

exports.allAccess = (req, res) => {
    res.status(200).send({message: "Conteúdo público"}); //get genérico. retorna nome de um usuário qualquer e para todos os usuários
}

exports.userBoard = (req, res) => {
    res.status(200).send({message: "Conteúdo pessoal"}); //get específico. retorna todas as infos do usuário para o próprio
}

exports.updateUser = async (req, res) => {
    const id = res.locals.userId;
    const {name, email, password} = req.body;
    await Users.update(
        {
            email: email,
            name: name,
            password: bcrypt.hashSync(password, 8)
        }, 
        {
            where: {id: id}
        }
    )
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Usuário atualizado com sucesso"
            });
        } else {
            res.send({
                message: "Não foi possível atualizar o usuário. Tente novamente"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro na atualização do usuário. Tente novamente"
        });
    });
};

exports.deleteUser = async (req, res) => {
    const id = res.locals.userId;
   
    await Users.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Usuário deletado com sucesso"
            });
        } else {
            res.send({
                message: "Não foi possível deletar o usuário. Tente novamente"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao deletar o usuário. Tente novamente"
        });
    });
};