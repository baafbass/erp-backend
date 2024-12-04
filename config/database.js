const sql = require('mssql');
require('dotenv').config();

const db = () => {
    const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
        enableArithAbort: process.env.DB_ENABLE_ARITH_ABORT === 'true',
    }
};

    sql.connect(config)
    .then(() => {
        console.log('Connected to MSSQL Database.');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });
}


module.exports = db;
