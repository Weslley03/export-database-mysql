const mysql = require('mysql');
const { createWriteStream } = require('fs');
require('dotenv').config()

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

console.time('query execution time');

const query = connection.query(`SELECT ID_USER, NOME, EMAIL FROM USERS`); //alterar conforme necessidade.
const outputStream = createWriteStream('output.csv');
outputStream.write('ID_USER - NOME - EMAIL\n');

query.on('result', (row) => {
  connection.pause();

  const csvrow = `${row.ID_USER}, ${row.NOME}, ${row.EMAIL}\n`;
  
  outputStream.write(csvrow, () => {
    connection.resume();
  });

}) .on('end', () => {
  console.log('export completed');
  outputStream.end();
  connection.end();
  console.timeEnd('query execution time');
}) .on('error', (err) => {
  console.error(`query error: `, err);
  outputStream.end();
  connection.end();
});
