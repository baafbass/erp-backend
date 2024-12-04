const sql = require('mssql');
const config = require('../../config/database');

const getOperasyonFromDB = async (operasyon) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, operasyon)
        .execute('sp_GetOperasyon');
    return result.recordset[0];
};

const createOperasyonFromDB = async (firma_kodu,operasyon,operasyon_aciklamasi,passif_mi) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, operasyon)
        .input('DOCTYPETEXT', sql.VarChar, operasyon_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_CreateOperasyon');
};

const updateOperasyonFromDB = async (firma_kodu,operasyon,operasyon_aciklamasi,passif_mi) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, operasyon)
        .input('DOCTYPETEXT', sql.VarChar, operasyon_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_UpdateOperasyon');
    return result.rowsAffected[0];
};

const deleteOperasyonFromDB = async (operasyon) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, operasyon)
        .execute('sp_DeleteOperasyon');
    return result.rowsAffected[0];
};

module.exports = {
    getOperasyonFromDB,
    createOperasyonFromDB,
    updateOperasyonFromDB,
    deleteOperasyonFromDB
}