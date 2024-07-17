module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('user_master', {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mobile: {
            type: Sequelize.STRING,
            allowNull: false
        },
        img: {
          type: Sequelize.STRING(50)
        },
        isMaster: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            default: false
        },
    });

    user.associate = (models) => {
        user.hasMany(models.answer, {
            foreignKey: 'userId',
            sourceKey: 'userId',
            as: 'user',
        });
    };
    
    return user;
};


