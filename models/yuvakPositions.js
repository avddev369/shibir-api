module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('yuvak_position', {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        deviceId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        top: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bottom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        left: {
            type: Sequelize.STRING,
            allowNull: false
        },
        right: {
            type: Sequelize.STRING,
            allowNull: false
        },
      
    });

    
    return user;
};


