const db = require("../models");

const Product = db.product;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Não é possível criar uma vaquinha sem um título"
      });
      return;
    }
    const user_id = res.locals.userID;
    // Create a product
    const { title, category,
           value, deadline, description} = req.body
  
    // Save product in the database
    Product.create(
  {
    user_id:user_id,
    title:title,
    category:category,
    value:value,
    deadline:deadline,
    description:description
  })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro ao criar vaquinha"
        });
      });
  };
  
  exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    
    Product.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Houve um erro ao pegar as vaquinhas."
      });
    });
  };
  
exports.updateProduct = (req, res) => {
      // Validate request
      //Need to do
      // Take product update
      const user_id = res.locals.userId;
      const id = req.params.id
      const {title, category,
             value, deadline, description} = req.body
    
      // Save product in the database
      Product.update(
    {
      title:title,
      category:category,
      value:value,
      deadline:deadline,
      description:description
    },
    {
      where:{id:id,user_id:user_id}
    })
    .then(num => {
      if (num == 1) {
          res.send({
              message: "Vakinha atualizada com sucesso"
          });
      } else {
          res.send({
              message: "Não foi possível atualizar a vakinha. Tente novamente"
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro na atualização da vaquinha. Tente novamente"
      });
  });
};
exports.deleteProduct = async (req, res) => {
  const user_id = res.locals.userId;
  const id = req.params.id
 
  await Product.destroy({
    where: {id: id,user_id:user_id}
  })
  .then(num => {
      if (num == 1) {
          res.send({
              message: "Vaquinha deletada com sucesso"
          });
      } else {
          res.send({
              message: "Não foi possível deletar a vakinha. Tente novamente"
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao deletar a vakinha. Tente novamente"
      });
  });
};