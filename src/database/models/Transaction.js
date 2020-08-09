module.exports = (sequelize, dataTypes) => {
    let alias = 'Transaction';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        paymentMethod: dataTypes.STRING,
        deliveryMethod: dataTypes.STRING,
        totalAmount: dataTypes.DECIMAL
            };
        


    const Transaction = sequelize.define(alias, cols);
    
 Transaction.associate = function (models) {
     Transaction.hasMany(
         models.ShoppingCart, {
             as: 'shoppingcart',
             foreignKey: 'transactionId'
         }
     )
 }

   return Transaction
}