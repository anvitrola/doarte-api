const config = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL,
  {
    dialect: "postgres",
    ssl:true,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false 
        }
    },
  }

);
// const sequelize = new Sequelize(`${process.env.DATABASE_URI}?sslmode=require`, {
//     url: process.env.DATABASE_URL,
//     dialect: 'postgres',
//     logging: false,
//     ssl:true,
//     dialectOptions: {
//       ssl: {
//         rejectUnauthorized: false, // very important
//       }
//     }
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/user.model")(sequelize, Sequelize);
db.Fundraiser = require("./fundraiser.model")(sequelize, Sequelize);

db.Fundraiser.belongsTo(db.User, { foreignKey: "user_id" });
db.User.hasMany(db.Fundraiser, { foreignKey: "user_id" });

module.exports = db;
