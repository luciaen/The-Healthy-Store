module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Category: dataTypes.STRING,
        
    };
        
    const Category = sequelize.define(alias, cols)
    Category.associate = function(models) {
        Category.hasMany(
            models.Product,
            {
                as : 'productos',
                foreignKey: 'id'
            }
        )
    };

    return Category
}