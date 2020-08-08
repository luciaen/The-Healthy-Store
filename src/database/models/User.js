module.exports = (sequelize, dataTypes) => {
        let alias = 'User';
        let cols = {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: dataTypes.STRING,
            lastName: dataTypes.STRING,
            email: dataTypes.STRING,
            phone: dataTypes.INTEGER,
            password: dataTypes.STRING,
            image: dataTypes.STRING
        };

        const User = sequelize.define(alias, cols);
         return User
}   