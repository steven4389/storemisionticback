'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    valor: DataTypes.DOUBLE,
    peso: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    descripcion: DataTypes.TEXT
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category, { as: "category", foreignKey: "category_id" });
  };
  return Product;
};