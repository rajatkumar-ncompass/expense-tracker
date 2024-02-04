require("dotenv").config("../../.env");
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "expense_tracker",
});

const connectionPromise = connection.promise();

async function executeQuery(query, data) {
  try {
    let y;
    await connectionPromise.query(query, data).then((response) => {
      y = response;
    });
    return y;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  executeQuery,
  connectionPromise,
};
