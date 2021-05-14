const db = require("../models");

const Product = db.Product;
const Users = db.Users;

const Op = db.Sequelize.Op;

exports.createProduct = (req, res) => {
    const user_id = res.locals.userId;
    const {title, category, goal_value, deadline, description} = req.body;

    //fazer contagem de quantas vaquinhas esse usuário já tem e retornar erro caso essa seja a 21º

    if (!req.body) {
      res.status(400).send(
        {
          message: "Não é possível criar uma vaquinha por falta de dados."
        }
      );
      return;
    }
  
    // Save product in the database
    Product.create(
      {
        user_id: user_id,
        title: title,
        category: category,
        goal_value: goal_value,
        current_value: 0,
        deadline: deadline,
        description: description
      }
    )
    .then(data => res.send(data))
    .catch(err => {
        res.status(500).send(
			{
          		message: err.message || "Erro ao criar vaquinha."
        	}
		);
    });
};
  
exports.findAll = (req, res) => {

    Product.findAll(
    	{
        	attributes:
        	[
          		'title', 
		  		'category',
         		'goal_value',
		 		'current_value', 
		 		'deadline', 
		 		'description'
        	],
        	include:
        	{
          		model:db.Users,attributes:[['name','owner']]
        	}
    	}
	)
    .then(data => res.send(data))
    .catch(err => {
      	res.status(500).send(
		  	{
			  message: err.message || "Houve um erro ao pegar as vaquinhas."
			}
		);
    });
};

exports.findUsersProducts =  (req, res) => {
  const user_id = res.locals.userId;

  	Product.findAll(
		{
		  attributes: 
			[
			  	'title', 
			  	'category',
  				'goal_value',
				'current_value', 
				'deadline', 
				'description'
			], 
			where: {user_id: user_id} 
		}
	)
  	.then(data => res.send(data))
  	.catch(err => {
    res.status(500).send(
		{
			message: err.message || "Erro ao retornar as vaquinhas do usuário."
    	}
	);
  });
};

exports.updateProduct = (req, res) => {
    const user_id = res.locals.userId;
    const product_id = req.params.id;

    const {title, category, goal_value, deadline, description} = req.body;
    
    Product.update(
    	{
      		title:title,
      		category:category,
      		goal_value:goal_value,
      		deadline:deadline,
      		description:description
    	},
    	{
      		where:
			{
				id: product_id, 
				user_id: user_id
			}
    	}
	)
    .then(num => {
      	if (num == 1) {
        	res.send(
				{
              		message: "Vaquinha atualizada com sucesso."
          		}
			);
      	} else {
          	res.send(
				{
              		message: "Não foi possível atualizar a vaquinha. Tente novamente."
          		}
			);
      	}
  	})
  	.catch(err => {
      	res.status(500).send(
			{
				message: "Erro na atualização da vaquinha. Tente novamente."
      		}
		);
  	});
};

exports.deleteProduct = async (req, res) => {
  const user_id = res.locals.userId;
  const product_id = req.params.id;
 
  	await Product.destroy(
		{
    		where: {
				id: product_id,
				user_id: user_id
			}
  		}
	)
  	.then(num => {
      	if (num == 1) {
          	res.send(
				{
              		message: "Vaquinha deletada com sucesso."
          		}
			);
      	} else {
        	res.send(
				{
            		message: "Não foi possível deletar a vaquinha. Tente novamente."
          		}
			);
      	}
  	})
  	.catch(err => {
    	res.status(500).send(
		{
          	message: "Erro ao deletar a vaquinha. Tente novamente."
      	}
		);
  	});
};