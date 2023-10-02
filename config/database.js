const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense", "root", "SQL@123sql", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
