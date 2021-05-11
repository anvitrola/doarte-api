module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("Project", {
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
