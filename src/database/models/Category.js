module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING,
    };
    
    const Category = sequelize.define(alias, cols)
    //Aqu´creo la relación con la tabla Products  - OJo: Relación de 1 a muchos
    Category.associate = function (models) {
        Category.hasMany(
            models.Product, {
                as: 'products',
                foreignKey: 'categoryId'
            }
        )
    }
    return Category
}