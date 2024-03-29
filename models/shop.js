exports.shop = (sequelize, Sequelize) => {
    const Shop = sequelize.define('Shop', {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        mobileNumber: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.BIGINT
        },
        city: {
            type: Sequelize.STRING
        },
        file: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.BIGINT
        }
    }, {
        indexes: [
            // Create a unique index on userId
            {
                unique: true,
                fields: ['userId']
            }
        ]
    });
    return Shop;
};