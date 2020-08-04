'user strict';
module.exports = (sequelize, dataTypes) => {
    let alias = 'product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING,
        description: dataTypes.STRING,
        stock: dataTypes.INTEGER,
        price: dataTypes.DECIMAL,
        discount: dataTypes.INTEGER,
        recommended: dataTypes.STRING,
        image: dataTypes.STRING
    };
    const product = sequelize.define(alias, cols)
    
    product.associate = function(models) {
        product.belongsTo(
            models.category,
            {
                as : 'product',
                foreignKey: 'categoryId'
            }
        )
    };
    return product
} 