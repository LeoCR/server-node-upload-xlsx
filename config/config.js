const Sequelize = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('products_list', 'root', '79461313', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    freezeTableName: true,
    underscored: false,
    timestamps: false
},
  port: "3306",
  pool: {
    max: 8050,
    min: 0,
    acquire: 3000000,
    idle: 1000000
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.product = require(path.resolve(__dirname+'/../model/product.model.js'))(sequelize, Sequelize);
module.exports = db;