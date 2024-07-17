module.exports = (sequelize, Sequelize) => {
    const session = sequelize.define('session_master', {
        ssId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shibirId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        shibirName: {
            type: Sequelize.STRING(50),
            defaultValue: false,
        },
        sessionId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sessionName: {
            type: Sequelize.STRING(50),
            defaultValue: false,
        },
        startDate: {
          type: Sequelize.DATEONLY
        },
        endDate: {
          type: Sequelize.DATEONLY
        },
        venue: {
            type: Sequelize.STRING(50),
            defaultValue: false,
        },
    });

    session.associate = (models) => {
        session.hasMany(models.question, {
            foreignKey: 'ssId',
            sourceKey: 'ssId',
            as: 'session',
        });
    };

    return session;
};


