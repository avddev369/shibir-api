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
        hintText: {
            type: Sequelize.STRING(100),
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
            values: ['TEXT', 'CHECKBOX', 'DROPDOWN', 'RADIO', 'AUDIO', 'IMAGE', 'VIDEO'],
            allowNull: false,
        },
        ssId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        priority: {
            type: Sequelize.INTEGER,
            allowNull: true
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


