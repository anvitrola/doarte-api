module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
        id: {
            type: Sequelize.INTEGER
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