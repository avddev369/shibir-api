module.exports = (sequelize, Sequelize) => {
    const question = sequelize.define('que_master', {
        queId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isRequired: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isGroupQue: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        queType: {
            type: Sequelize.ENUM,
            values: ['TEXT', 'CHECKBOX', 'RADIO', 'TEXTAREA', 'IMAGE'],
            allowNull: false,
        },
        ssId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    question.associate = (models) => {
        question.hasMany(models.option, {
            foreignKey: 'queId',
            sourceKey: 'queId',
            as: 'question',
        });

        question.hasMany(models.answer, {
            foreignKey: 'queId',
            sourceKey: 'queId',
            as: 'answer',
        });

        question.belongsTo(models.session, { 
            foreignKey: 'ssId' 
        });
    };

    return question;
};


