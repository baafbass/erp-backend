const sql = require('mssql');
const config = require('../../config/database');

const getAllUlkeFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllUlke');
    return result.recordset;
};

const getUlkeFromDB = async (ulke_kodu,firma_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COUNTRYCODE', sql.VarChar, ulke_kodu)
        .input('COMCODE',sql.VarChar,firma_kodu)
        .execute('sp_GetUlke');
    return result.recordset[0];
};

const createUlkeFromDB = async (firma_kodu,ulke_kodu,ulke_adi) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('COUNTRYCODE', sql.VarChar, ulke_kodu)
        .input('COUNTRYTEXT', sql.VarChar, ulke_adi)
        .execute('sp_CreateUlke');
};

const updateUlkeFromDB = async (firma_kodu,ulke_kodu,ulke_adi) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('COUNTRYCODE', sql.VarChar, ulke_kodu)
        .input('COUNTRYTEXT', sql.VarChar, ulke_adi)
        .execute('sp_UpdateUlke');
    return result.rowsAffected[0];
};

const deleteUlkeFromDB = async (ulke_kodu,firma_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COUNTRYCODE', sql.VarChar, ulke_kodu)
        .input('COMCODE',sql.VarChar,firma_kodu)
        .execute('sp_DeleteUlke');
    return result.rowsAffected[0];
};

module.exports = {
    getAllUlkeFromDB,
    getUlkeFromDB,
    createUlkeFromDB,
    updateUlkeFromDB,
    deleteUlkeFromDB
}