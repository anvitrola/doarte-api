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
db.Project = require("../models/project.model")(sequelize, Sequelize);

db.Project.belongsTo(db.Users, {
    through: "",
    foreignKey: ""
});

db.Users.hasMany(db.Project, {
    through: "",
    foreignKey: ""
});


module.exports = db
