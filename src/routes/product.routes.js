const products = require("../controllers/product.controller");
const {authJwt} = require("../middleware");

module.exports = app => {
  
 
  
    // Create a new Tutorial
  app.post("/api/test/product/create",authJwt, products.create);
  
    // Retrieve all products
  app.get("/api/test/product/findAll", products.findAll);

  app.patch("/api/test/product/update/:id",authJwt, products.updateProduct);
  
  app.delete("/api/test/product/delete/:id",authJwt, products.deleteProduct);

  

};
  