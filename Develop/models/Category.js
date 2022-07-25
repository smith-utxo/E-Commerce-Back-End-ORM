const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true, 
      primaryKey: true
    }, 
    category_name: {
      type: DataTypes.STRING, 
      allowNull: false
    }
  },
  { //other model options go here (customizations)
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category', // we need to choose the model name 
  }
);

module.exports = Category;
