require('dotenv').config();
const mysql = require('mysql');

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const runDatabase = () => {
  try {    
    connection.connect();
    console.log(`database on`);
  } catch (err) {
    console.error(`runDatabase error`, err);
  };
};

runDatabase();
