require('dotenv').config(); // Load environment variables from .env file

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // Convert to boolean
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
        enableArithAbort: process.env.DB_ENABLE_ARITH_ABORT === 'true',
    }
};

module.exports = config;
