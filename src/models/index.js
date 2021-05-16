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

db.User = require("../models/user.model")(sequelize, Sequelize);
db.Fundraiser = require("./fundraiser.model")(sequelize, Sequelize);

db.Fundraiser.belongsTo(db.User,{foreignKey: 'user_id'});
db.User.hasMany(db.Fundraiser, {foreignKey: 'user_id'});




module.exports = db
