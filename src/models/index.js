const config = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("../models/user.model")(sequelize, Sequelize);
db.Product = require("../models/product.model")(sequelize, Sequelize);

db.Product.belongsTo(db.Users);

db.Users.hasMany(db.Product, {foreignKey: ""});


module.exports = db
