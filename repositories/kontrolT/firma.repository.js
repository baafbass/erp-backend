const sql = require('mssql');
const config = require('../../config/database');

const getFirmaFromDB = async (firma_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .execute('sp_GetFirma');
    return result.recordset[0];
};

const createFirmaFromDB = async (firma_kodu,firma_adi,firma_adresi_1,firma_adresi_2,sehir_kodu,ulke_kodu) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('COMTEXT', sql.VarChar, firma_adi)
        .input('ADDRESS1', sql.VarChar, firma_adresi_1)
        .input('ADDRESS2', sql.VarChar, firma_adresi_2)
        .input('CITYCODE', sql.VarChar, sehir_kodu)
        .input('COUNTRYCODE', sql.VarChar, ulke_kodu)
        .execute('sp_CreateFirma');
};

const updateFirmaFromDB = async (firma_kodu,firma_adi,firma_adresi_1,firma_adresi_2,sehir_kodu,ulke_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('COMTEXT', sql.VarChar, firma_adi)
        .input('ADDRESS1', sql.VarChar, firma_adresi_1)
        .input('ADDRESS2', sql.VarChar, firma_adresi_2)
        .input('CITYCODE', sql.VarChar, sehir_kodu)
        .input('COUNTRYCODE', sql.VarChar, ulke_kodu)
        .execute('sp_UpdateFirma');
    return result.rowsAffected[0];
};

const deleteFirmaFromDB = async (firma_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .execute('sp_DeleteFirma');
    return result.rowsAffected[0];
};

module.exports = {
    getFirmaFromDB,
    createFirmaFromDB,
    updateFirmaFromDB,
    deleteFirmaFromDB
}