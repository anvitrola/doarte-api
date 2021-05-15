module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
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
        },
        active:{
            type: Sequelize.BOOLEAN
        }
    },
        {
            freezeTableName: true
        });

    return User;
}
