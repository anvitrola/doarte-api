const db = require("../models");
const bcrypt = require("bcryptjs");

const Users = db.Users;
const Product = db.Product;

const Op = db.Sequelize.Op;

exports.allAccess = (_, res) => {

    Users.findAll(
        {
            attributes: ['name', 'email']
        }
    )
    .then(data => res.send(data))
    .catch(err => {
        res.status(500).send(
            {
                message: err.message || "Erro ao listar usuários."
            }
        );
    });
};

exports.userBoard = (req, res) => {
    const {email} = req.body;

    Users.findAll(
        {
            where: {email: email}
        }
    )
    .then(data => res.send(data))
    .catch(err => {
        res.status(500).send(
            {
                message: err.message || "Erro ao requisitar informações do usuário."
            }
        );
    });
};

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
            res.send(
                {
                    message: "Usuário atualizado com sucesso."
                }
            );
        } else {
            res.send(
                {
                    message: "Não foi possível atualizar o usuário. Tente novamente."
                }
            );
        }
    })
    .catch(err => {
        res.status(500).send(
            {
                message: "Erro na atualização do usuário. Tente novamente."
            }
        );
    });
};

exports.deleteUser = async (req, res) => {
    const id = res.locals.userId;
   
    await Users.destroy(
        {
            where: {id: id}
        }
    )
    .then(num => {
        if (num == 1) {
            res.send(
                {
                    message: "Usuário deletado com sucesso."
                }
            );
        } else {
            res.send(
                {
                    message: "Não foi possível deletar o usuário. Tente novamente."
                }
            );
        }
    })
    .catch(err => {
        res.status(500).send(
            {
                message: "Erro ao deletar o usuário. Tente novamente."
            }
        );
    });
};

exports.donation = (req, res) => {
    const {donation_value} = req.body;
    const id = res.locals.userId;

    if (donation_value < 25 || !donation_value) res.status(400).send("Doação não pode ser inferior a 25 moedas");

    Users.findAll(
        {
            attributes: ['amount_money']
        },
        {
            where: {id: id}
        }
    )
    .then(amount_money => {
        if (amount_money < donation_value || amount_money == 0)
            res.status(400).send({message: "Saldo insuficiente."}); 

        else if ((amount_money -= donation_value) < 0){
            res.status(400).send({message: "Usuário não pode ficar negativado."});
        }

        //Aqui falta fazer as verificações da vaquinha antes de realizar de fato a transação. (checar modelo BPMN).
        const newAmount = amount_money - donation_value;

        Users.update(
            {
                amount_money: newAmount
            }, 
            {
                where: {id: id}
            }
        );

        //Aqui entraria o update da vaquinha com o novo valor e novas checagens: essa vaquinha, c essa transação, atinge seu objetivo?
        
        res.send("Doação realizada com sucesso.")
    })
    .catch(err => {
        res.status(500).send(
            {
                message: err.message || "Erro no processamento da doação."
            }
        );
    });
}