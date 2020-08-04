'use strict';
module.exports = (sequelize, dataTypes) => {
  let alias = 'user';
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
  passsword: dataTypes.STRING,
  image: dataTypes.STRING,
  admin: dataTypes.INTEGER
};
const user = sequelize.define(alias, cols)
return user
}