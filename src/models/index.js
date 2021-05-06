const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,

    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("../models/user.model")(sequelize, Sequelize);
db.Project = require("../models/project.model")(sequelize, Sequelize);

db.Project.belongsTo(db.Users, {
    through: "",
    foreignKey: ""
});

db.Users.hasMany(db.Project, {
    through: "",
    foreignKey: ""
});