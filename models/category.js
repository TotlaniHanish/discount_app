exports.category = (sequelize, Sequelize) => {
    const Category = sequelize.define('Category', {
        name: {
            type: Sequelize.STRING
        },
        fileUrl: {
            type: Sequelize.STRING
        }
    }, {
    });
    return Category;
};