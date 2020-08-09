 module.exports = (sequelize, dataTypes) => {
         let alias = 'ShoppingCart';
         let cols = {
             id: {
                 type: dataTypes.INTEGER,
                 primaryKey: true,
                 autoIncrement: true
             },
             userId: dataTypes.INTEGER,
             productId: dataTypes.INTEGER,
             price: dataTypes.DECIMAL,
             quantity: dataTypes.INTEGER,
             transactionId: dataTypes.INTEGER,
         };


         
             const ShoppingCart = sequelize.define(alias, cols);
              ShoppingCart.associate = function (models) {
                  ShoppingCart.belongsTo(
                      models.User, {
                          as: 'user',
                          foreignKey: 'userId'
                      }
                  )
              };

               ShoppingCart.associate = function (models) {
                  ShoppingCart.belongsTo(
                      models.Transaction, {
                          as: 'transaction',
                          foreignKey: 'transactionId'
                      }
                  )
              };

              ShoppingCart.associate = function (models) {
                  ShoppingCart.belongsTo(
                      models.Product, {
                          as: 'product',
                          foreignKey: 'productId'
                      }
                  )
              };


             return ShoppingCart 
         } 