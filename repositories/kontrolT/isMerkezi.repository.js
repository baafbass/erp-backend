const sql = require('mssql');
const config = require('../../config/database');

const getAllIsMerkeziFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllIsMerkezi');
    return result.recordset;
};

const getIsMerkeziFromDB = async (is_merkezi,firma_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, is_merkezi)
        .input('COMCODE',sql.VarChar,firma_kodu)
        .execute('sp_GetIsMerkezi');
    return result.recordset[0];
};

const createIsMerkeziFromDB = async (firma_kodu,is_merkezi,is_merkezi_aciklamasi,passif_mi) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, is_merkezi)
        .input('DOCTYPETEXT', sql.VarChar, is_merkezi_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_CreateIsMerkezi');
};

const updateIsMerkeziFromDB = async (firma_kodu,is_merkezi,is_merkezi_aciklamasi,passif_mi) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, is_merkezi)
        .input('DOCTYPETEXT', sql.VarChar, is_merkezi_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_UpdateIsMerkezi');
    return result.rowsAffected[0];
};

const deleteIsMerkeziFromDB = async (is_merkezi,firma_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, is_merkezi)
        .input('COMCODE',sql.VarChar,firma_kodu)
        .execute('sp_DeleteIsMerkezi');
    return result.rowsAffected[0];
};

module.exports = {
    getAllIsMerkeziFromDB,
    getIsMerkeziFromDB,
    createIsMerkeziFromDB,
    updateIsMerkeziFromDB,
    deleteIsMerkeziFromDB
}