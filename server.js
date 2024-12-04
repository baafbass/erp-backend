const http = require('http')
const db = require('./config/database');
const app = require('./app')
const dotenv = require('dotenv')

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

db();

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
