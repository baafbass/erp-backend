const sql = require('mssql');
const config = require('../config/database');


const getAllMalzemeFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM malzeme');
    return result.recordset;
};


const getMalzemeByIdFromDB = async (id) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM malzeme WHERE id = @id');
    return result.recordset[0];
};


const createMalzemeFromDB = async (ad, miktar, birim, firma_id) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('ad', sql.NVarChar, ad)
        .input('miktar', sql.Int, miktar)
        .input('birim', sql.NVarChar, birim)
        .input('firma_id', sql.Int, firma_id)
        .query('INSERT INTO malzeme (ad, miktar, birim, firma_id) VALUES (@ad, @miktar, @birim, @firma_id)');
};


const updateMalzemeFromDB = async (id, ad, miktar, birim, firma_id) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('ad', sql.NVarChar, ad)
        .input('miktar', sql.Int, miktar)
        .input('birim', sql.NVarChar, birim)
        .input('firma_id', sql.Int, firma_id)
        .query('UPDATE malzeme SET ad = @ad, miktar = @miktar, birim = @birim, firma_id = @firma_id WHERE id = @id');
    return result.rowsAffected[0];
};


const deleteMalzemeFromDB = async (id) => {
    const pool = await sql.connect(config);
    const result = await pool.request().input('id', sql.Int, id).query('DELETE FROM malzeme WHERE id = @id');
    return result.rowsAffected[0];
};

module.exports = {
    getAllMalzemeFromDB,
    getMalzemeByIdFromDB,
    createMalzemeFromDB,
    updateMalzemeFromDB,
    deleteMalzemeFromDB,
};
