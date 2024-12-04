const sql = require('mssql');
const config = require('../../config/database');

const getRotaFromDB = async (rota) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, rota)
        .execute('sp_GetRota');
    return result.recordset[0];
};

const createRotaFromDB = async (firma_kodu,rota,rota_aciklamasi,passif_mi) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, rota)
        .input('DOCTYPETEXT', sql.VarChar, rota_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_CreateOperasyon');
};

const updateRotaFromDB = async (firma_kodu,rota,rota_aciklamasi,passif_mi) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, rota)
        .input('DOCTYPETEXT', sql.VarChar, rota_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_UpdateRota');
    return result.rowsAffected[0];
};

const deleteRotaFromDB = async (rota) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, rota)
        .execute('sp_DeleteRota');
    return result.rowsAffected[0];
};

module.exports = {
    getRotaFromDB,
    createRotaFromDB,
    updateRotaFromDB,
    deleteRotaFromDB
}