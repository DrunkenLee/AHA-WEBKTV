'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Song.init({
    judul: DataTypes.STRING,
    artis: DataTypes.STRING,
    path: DataTypes.STRING,
    voc: DataTypes.INTEGER,
    xvoc: DataTypes.INTEGER,
    GolId: DataTypes.INTEGER,
    JenisId: DataTypes.INTEGER,
    vol: DataTypes.INTEGER,
    hits: DataTypes.INTEGER,
    new: DataTypes.INTEGER,
    popular: DataTypes.INTEGER,
    judul3: DataTypes.STRING,
    exjudul: DataTypes.STRING,
    artis3: DataTypes.STRING,
    exartis: DataTypes.STRING,
    Balancing: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};