'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.User,{ 
        foreignKey: 'idUser'
      })

      this.hasMany(models.product_in, {
        foreignKey: 'idProduct',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      this.hasMany(models.product_out, {
        foreignKey: 'idProduct',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      
    }
  };
  Product.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    urlImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};