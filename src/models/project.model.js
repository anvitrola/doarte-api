module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("Project", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.TEXT('tiny')
        },
        category: {
            type: Sequelize.STRING
        },
        value: { //seriam 2 tipos de dados: goal_value e current_value?
            type: Sequelize.FLOAT
        },
        deadline: {
            type: Sequelize.DATE(6)
        },
        created_at: {
            type: Sequelize.DATE(6)
        },
        description: {
            type: Sequelize.TEXT
        }
    },
        {
            freezeTableName: true
        });

    return Project;
}
