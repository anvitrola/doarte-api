module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Product", {
        user_id: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.TEXT('tiny')
        },
        category: {
            type: Sequelize.STRING
        },
        goal_value: { 
            type: Sequelize.FLOAT
        },
        current_value: { 
            type: Sequelize.FLOAT
        },
        deadline: {
            type: Sequelize.DATE(6)
        },
        description: {
            type: Sequelize.TEXT
        }
    },
        {
            freezeTableName: true
        });

    return Product;
}
