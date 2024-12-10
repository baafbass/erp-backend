const sql = require('mssql');
const config = require('../../config/database');

const getAllSehirFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllSehir');
    return result.recordset;
};

const getSehirFromDB = async (rota) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, sehir)
        .execute('sp_GetSehir');
    return result.recordset[0];
};

const createSehirFromDB = async (firma_kodu,sehir_kodu,sehir_adi,ulke_kodu) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('CITYCODE', sql.VarChar, sehir_kodu)
        .input('CITYTEXT', sql.VarChar, sehir_adi)
        .input('COUNTRYCODE', sql.VarChar, ulke_kodu)
        .execute('sp_CreateSehir');
};

const updateSehirFromDB = async (firma_kodu,sehir_kodu,sehir_adi,ulke_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('CITYCODE', sql.VarChar, sehir_kodu)
        .input('CITYTEXT', sql.VarChar, sehir_adi)
        .input('COUNTRYCODE', sql.VarChar, ulke_kodu)
        .execute('sp_UpdateSehir');
    return result.rowsAffected[0];
};

const deleteSehirFromDB = async (sehir_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('CITYCODE', sql.VarChar, sehir_kodu)
        .execute('sp_DeleteSehir');
    return result.rowsAffected[0];
};

module.exports = {
    getAllSehirFromDB,
    getSehirFromDB,
    createSehirFromDB,
    updateSehirFromDB,
    deleteSehirFromDB
}