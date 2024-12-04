const sql = require('mssql');
const config = require('../../config/database');

const getAllMalzemeFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllMalzeme');
    return result.recordset;
};

const getMalzemeFromDB = async (malzeme) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, malzeme)
        .execute('sp_GetMalzeme');
    return result.recordset[0];
};

const createMalzemeFromDB = async (firma_kodu, malzeme, malzeme_aciklamasi, passif_mi) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, malzeme)
        .input('DOCTYPETEXT', sql.VarChar, malzeme_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_CreateMalzeme');
};

const updateMalzemeFromDB = async (firma_kodu, malzeme, malzeme_aciklamasi, passif_mi) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, malzeme)
        .input('DOCTYPETEXT', sql.VarChar, malzeme_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_UpdateMalzeme');
    return result.rowsAffected[0];
};

const deleteMalzemeFromDB = async (malzeme) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.Int, malzeme)
        .execute('sp_DeleteMalzeme');
    return result.rowsAffected[0];
};

module.exports = {
    getAllMalzemeFromDB,
    getMalzemeFromDB,
    createMalzemeFromDB,
    updateMalzemeFromDB,
    deleteMalzemeFromDB,
};
