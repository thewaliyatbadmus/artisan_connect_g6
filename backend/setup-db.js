const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function run() {
  console.log('Connecting to local MySQL server (Make sure it is running!)...');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    console.log('Connected to MySQL successfully!');

    console.log('Running database/schema.sql...');
    const schemaSql = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf-8');
    await connection.query(schemaSql);
    console.log(' schema.sql executed successfully!');

    // The schema creates and uses the `artisan_connect` database, so we don't need to specify it.

    console.log('Running database/sample-data.sql...');
    const dataSql = fs.readFileSync(path.join(__dirname, '../database/sample-data.sql'), 'utf-8');
    await connection.query(dataSql);
    console.log('sample-data.sql executed successfully!');

    console.log('\n--- Manual Verification Query ---');
    console.log('SELECT * FROM artisan_connect.artisans');
    const [rows] = await connection.query('SELECT * FROM artisan_connect.artisans');
    console.table(rows);
    console.log(' You can query data manually!');

    await connection.end();
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused! Please ensure your local MySQL server (like XAMPP or WAMP) is running on port 3306.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Access denied! Please check your DB_USER and DB_PASSWORD in the .env file.');
    } else {
      console.error('Database Setup Failed:', error);
    }
  }
}

run();

