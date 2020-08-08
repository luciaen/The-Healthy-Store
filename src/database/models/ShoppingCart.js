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
             

             return ShoppingCart 
         } 