module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
        id: {
            type: Sequelize.INTEGER,
<<<<<<< HEAD
            primaryKey: true
=======
            primaryKey: true,
>>>>>>> 51b66bc74e8e578d5e4d6b8f34a93f191bcf80db
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        amout_money: {
            type: Sequelize.FLOAT
        }
    },
        {
            freezeTableName: true
        });

    return User;
}
