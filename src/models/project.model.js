module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("Project", {
<<<<<<< HEAD
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
=======
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
>>>>>>> 51b66bc74e8e578d5e4d6b8f34a93f191bcf80db
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
<<<<<<< HEAD
            type: Sequelize.TEXT('large')
=======
            type: Sequelize.TEXT
>>>>>>> 51b66bc74e8e578d5e4d6b8f34a93f191bcf80db
        }
    },
        {
            freezeTableName: true
        });

    return Project;
}
