const express = require('express');
const sql = require('mssql');
const config = require('./config/database');

const malzemeRoutes = require('./routes/malzeme.routes');

const app = express();
const port = 3000;

app.use(express.json());

sql.connect(config)
    .then(() => {
        console.log('Connected to MSSQL Database.');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });

app.use('/api/malzeme',malzemeRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
