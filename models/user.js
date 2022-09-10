exports.user = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        mobileNumber: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
        isShopOwner: {
            type: Sequelize.TINYINT
        }
    }, {
        indexes: [
            // Create a unique index on email
            {
                unique: true,
                fields: ['email']
            }
        ]
    });
    return User;
};