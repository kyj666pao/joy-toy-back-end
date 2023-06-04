'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collection.belongsTo(models.Profile, { foreignKey: 'profileId' })
    }
  }
  Collection.init({
    title:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    img: DataTypes.STRING(1234),
    description: DataTypes.STRING,
    
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    series: DataTypes.STRING,
    brand: DataTypes.STRING,

    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};