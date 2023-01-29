exports.file = (sequelize, Sequelize) => {
    const File = sequelize.define('File', {
        userId: {
            type: Sequelize.BIGINT
        },
        category: {
            type: Sequelize.STRING
        }
    }, {
        indexes: [
        ]
    });
    return File;
};