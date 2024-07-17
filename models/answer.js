module.exports = (sequelize, Sequelize) => {
    const answer = sequelize.define('answer_master', {
        ansId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        queId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        answer: {
            type: Sequelize.STRING,
            allowNull: false
        },
        opId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    answer.associate = (models) => {

        answer.belongsTo(models.user, { 
            foreignKey: 'userId' 
        });

        answer.belongsTo(models.question, { 
            foreignKey: 'queId' 
        });

        answer.belongsTo(models.option, { 
            foreignKey: 'opId' 
        });
    };

    return answer;
};


