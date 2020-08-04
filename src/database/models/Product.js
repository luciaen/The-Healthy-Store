'user strict';
module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
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
    const Product = sequelize.define(alias, cols)
    
    Product.associate = function(models) {
        Product.belongsTo(
            models.Category,
            {
                as : 'Product',
                foreignKey: 'categoryId'
            }
        )
    };
    return Product
} 