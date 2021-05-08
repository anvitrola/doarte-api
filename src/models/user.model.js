module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
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
        amount_money: {
            type: Sequelize.FLOAT
        }
    },
        {
            freezeTableName: true
        });

    return User;
}
