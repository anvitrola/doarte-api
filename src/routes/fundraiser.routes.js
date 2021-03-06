const fundraisers = require("../controllers/fundraiser.controller");
const {authJwt} = require("../middleware");

module.exports = app => {
  //EN || PT
  
  //Authenticate user and Create a fundraiser || Autentifica o usuário e Cria uma vaquinha
  app.post("/fundraiser/create",authJwt, fundraisers.createFundraiser);

  // Retrieve all fundraisers || Retorna todas as vaquinhas
  app.get("/fundraiser/findAll", fundraisers.findAll);

  //Authenticate user and Retrieve their fundraisers || Autentifica o usuário e retorna todas as suas vaquinhas
  app.get("/fundraiser/findUsersFundraisers/",authJwt, fundraisers.findUsersFundraisers);

  // Update fundraiser || Atualiza vaquinha
  app.patch("/fundraiser/update/:id",authJwt, fundraisers.updateFundraiser);
  
  // Delete fundraiser || Deleta vaquinha
  app.patch("/fundraiser/delete/:id",authJwt, fundraisers.deleteFundraiser);

};
  