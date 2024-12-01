const sql = require('mssql');
const config = require('../config/database');


const getAllMalzeme = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM malzeme');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getMalzemeById = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().input('id', sql.Int, req.params.id).query('SELECT * FROM malzeme WHERE id = @id');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createMalzeme = async (req, res) => {
    const { ad, miktar, birim, firma_id } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('ad', sql.NVarChar, ad)
            .input('miktar', sql.Int, miktar)
            .input('birim',sql.NVarChar,birim)
            .input('firma_id',sql.Int,firma_id)
            .query('INSERT INTO malzeme (ad, miktar, birim, firma_id) VALUES (@ad, @miktar, @birim, @firma_id)');
        res.status(201).json({ message: 'Malzeme created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateMalzeme = async (req, res) => {
    const { ad, miktar, birim, firma_id } = req.body;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('ad', sql.NVarChar, ad)
            .input('miktar', sql.Int, miktar)
            .input('birim',sql.NVarChar,birim)
            .input('firma_id',sql.Int,firma_id)
            .query(`
                UPDATE malzeme 
                SET ad = @ad, miktar = @miktar, birim = @birim, firma_id = @firma_id
                WHERE id = @id
            `);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        res.json({ message: 'Malzeme updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteMalzeme = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().input('id', sql.Int, req.params.id).query('DELETE FROM malzeme WHERE id = @id');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        res.json({ message: 'Malzeme deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMalzeme,
    getMalzemeById,
    createMalzeme,
    updateMalzeme,
    deleteMalzeme
}