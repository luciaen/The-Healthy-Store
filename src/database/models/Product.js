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
        categoryId: dataTypes.INTEGER,
        discount: dataTypes.INTEGER,
        recomended: dataTypes.STRING,
        image: dataTypes.STRING
    };



    const Product = sequelize.define(alias, cols)
    //Aquí creo mi relación entre Platos (Diskes) y Categorias (Categories)
    Product.associate = function (models) {
        Product.belongsTo(
            models.Category, {
                as: 'category',
                foreignKey: 'categoryId'
            }
        )
    };

    return Product
}