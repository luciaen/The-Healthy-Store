module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: dataTypes.STRING,
        };
        const Category = sequelize.define(alias, cols)
    
       Category.associate = function(models) {
            Category.hasMany(
                models.Product,
                {
                    as : 'Category',
                    foreignKey: 'categoryId'
                }
            )
       }
       return Category
    } 
