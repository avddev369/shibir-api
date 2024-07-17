module.exports = (sequelize, Sequelize) => {
    const option = sequelize.define('option_master', {
        opId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        option: {
            type: Sequelize.STRING,
            allowNull: false
        },
        queId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    option.associate = (models) => {

        option.hasMany(models.answer, {
            foreignKey: 'opId',
            sourceKey: 'opId',
            as: 'optionAnswer',
        });

        option.belongsTo(models.question, { 
            foreignKey: 'queId' 
        });
    };

    return option;
};


