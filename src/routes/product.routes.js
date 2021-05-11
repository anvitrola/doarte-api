module.exports = app => {
    const products = require("../controllers/product.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", products.create);
  
    // Retrieve all products
    router.get("/", products.findAll);
  
 
  };
  