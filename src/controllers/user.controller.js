const db = require("../models");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { deleteUserFundraisers } = require("./fundraiser.controller");
const User = db.User;
const Fundraiser = db.Fundraiser;

const Op = db.Sequelize.Op;

exports.allAccess = (_, res) => {
  User.findAll({
    attributes: ["name", "email"],
    where: { active: true },
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao listar usuários.",
      });
    });
};

exports.userBoard = (req, res) => {
  const { email } = req.body;

  User.findAll({
    where: { email: email, active: true },
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao requisitar informações do usuário.",
      });
    });
};

exports.updateUser = async (req, res) => {
  const id = req.userId;
  const { name, email, password } = req.body;

  await User.update(
    {
      email: email,
      name: name,
      password: bcrypt.hashSync(password, 8)
    },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuário atualizado com sucesso.",
        });
      } else {
        res.send({
          message: "Não foi possível atualizar o usuário. Tente novamente.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na atualização do usuário. Tente novamente.",
      });
    });
};

exports.deleteUser = async (req, res) => {
  const id = req.userId;

  await deleteUserFundraisers(id);

  await User.update(
    {
      email: "deletado",
      name: "deletado",
      password: "deletado",
      active: false
    },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuário deletado com sucesso.",
        });
      } else {
        res.send({
          message: "Não foi possível deletar o usuário. Tente novamente.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao deletar o usuário. Tente novamente.",
      });
    });
};

exports.donation = async (req, res) => {
  const { donation_value } = req.body;
  const user_id = req.userId;
  const fundraiser_id = req.params.id;
  let newAmount = 0;

  if (donation_value < 25 || !donation_value) {
    res.status(400).send("Doação não pode ser inferior a 25 moedas");
    return;
  }

  const data = await sequelize.transaction(async () => {
    try {
      const request = await User.findOne(
        {
          attributes: ["amount_money", "id"],
          where: { id: user_id }
        },
        
      );
      return(request);
    } catch (e) {
      res.send(e);
    }
  });
  const {dataValues:{amount_money}} = data
  if (amount_money < donation_value || amount_money == 0) {
    res.status(400).send({ message: "Saldo insuficiente." });
    return;
  } else if (amount_money < donation_value) {
    res.status(400).send({ message: "Usuário não pode ficar negativado." });
    return;
  } else {
    newAmount = amount_money - donation_value;
  }
  //Aqui falta fazer as verificações da vaquinha antes de realizar de fato a transação. (checar modelo BPMN).
  await Fundraiser.findAll({
      where: { id: fundraiser_id, user_id: user_id },
  }).then((data) => {
      if (!data) {
        res.status(400).send({ message: "Não é possivel doar para sua própria vaquinha." });
        return;
      }

  });

      await User.update(
      {
        amount_money: newAmount,
      },
      {
        where: { id: user_id },
      }
    );
    //Aqui entraria o update da vaquinha com o novo valor e novas checagens: essa vaquinha, c essa transação, atinge seu objetivo?
    const data_2 = await sequelize.transaction(async () => {
      try {
        const request = await Fundraiser.findOne(
          {
            attributes: ["goal_value", "current_value"],
            where: { id: fundraiser_id }
          },
          
        );
        return(request);
      } catch (e) {
        res.send(e);
      }
    });
    const {dataValues:{goal_value,current_value}} = data_2  

    let updatedFundraiser = "";
    let message = "";
    if((current_value+donation_value) >= goal_value){
      updatedFundraiser = {
        current_value: Sequelize.literal(`current_value + ${donation_value}`),
        status:false
      }
      message = "A meta da vaquinha foi batida!";
    }
    else{
      updatedFundraiser = {
        current_value: Sequelize.literal(`current_value + ${donation_value}`),
      }
      message = "Doação realizada com sucesso.";
    }
      
      await Fundraiser.update(
      updatedFundraiser,
      {
        where: {
          id: fundraiser_id,
        },
      }
    )
      .then((num) => {
        if (num == 1) {
          res.send({
            message: message,
          });
        } else {
          res.send({
            message: "Não foi possível atualizar a vaquinha. Tente novamente.",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Erro na atualização da vaquinha. Tente novamente.",
        });
      });

};
