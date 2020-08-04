module.exports = (sequelize, dataTypes) => {
    let alias = 'category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: dataTypes.STRING,
        };
        const category = sequelize.define(alias, cols)
    
       category.associate = function(models) {
            category.hasMany(
                models.product,
                {
                    as : 'category',
                    foreignKey: 'categoryId'
                }
            )
       }
       return category
    } 
