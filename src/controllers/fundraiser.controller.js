const db = require("../models");

const Fundraiser = db.Fundraiser;

const Op = db.Sequelize.Op;

exports.createFundraiser = (req, res) => {
  const user_id = req.userId;
  const { title, category, goal_value, deadline, description } = req.body;

  //fazer contagem de quantas vaquinhas esse usuário já tem e retornar erro caso essa seja a 21º

  if (!req.body) {
    res.status(400).send({
      message: "Não é possível criar uma vaquinha por falta de dados.",
    });
    return;
  }

  // Save Fundraiser in the database
  Fundraiser.create({
    user_id: user_id,
    title: title,
    category: category,
    goal_value: goal_value,
    current_value: 0,
    deadline: deadline,
    description: description,
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao criar vaquinha.",
      });
    });
};

exports.findAll = (req, res) => {
  Fundraiser.findAll({
    attributes: [
      "title",
      "category",
      "goal_value",
      "current_value",
      "deadline",
      "description",
    ],
    include: {
      model: db.User,
      attributes: [["name", "owner"]],
    },
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Houve um erro ao pegar as vaquinhas.",
      });
    });
};

exports.findUsersFundraisers = (req, res) => {
  const user_id = req.userId;

  Fundraiser.findAll({
    attributes: [
      "title",
      "category",
      "goal_value",
      "current_value",
      "deadline",
      "description",
    ],
    where: { user_id: user_id },
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao retornar as vaquinhas do usuário.",
      });
    });
};

exports.updateFundraiser = (req, res) => {
  const user_id = req.userId;
  const fundraiser_id = req.params.id;

  const { title, category, goal_value, deadline, description } = req.body;

  Fundraiser.update(
    {
      title: title,
      category: category,
      goal_value: goal_value,
      deadline: deadline,
      description: description,
    },
    {
      where: {
        id: fundraiser_id,
        user_id: user_id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vaquinha atualizada com sucesso.",
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

exports.deleteFundraiser = async (req, res) => {
  const user_id = req.userId;
  const fundraiser_id = req.params.id;

  await Fundraiser.destroy({
    where: {
      id: fundraiser_id,
      user_id: user_id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vaquinha deletada com sucesso.",
        });
      } else {
        res.send({
          message: "Não foi possível deletar a vaquinha. Tente novamente.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao deletar a vaquinha. Tente novamente.",
      });
    });
};
