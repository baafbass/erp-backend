const sql = require('mssql');
const config = require('../../config/database');

const getAllBirimFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllBirim');
    return result.recordset;
};

const getBirimFromDB = async (birim_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('UNITCODE', sql.VarChar, birim_kodu)
        .execute('sp_GetBirim');
    return result.recordset[0];
};

const createBirimFromDB = async (firma_kodu,birim_kodu, birim_adi, ana_agirlik_birimi, ana_birim_kodu) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('UNITCODE', sql.VarChar, birim_kodu)
        .input('UNITTEXT', sql.VarChar, birim_adi)
        .input('ISMAINUNIT', sql.Int, ana_agirlik_birimi)
        .input('MAINUNITCODE',sql.VarChar,ana_birim_kodu)
        .execute('sp_CreateBirim');
};

const updateBirimFromDB = async (firma_kodu,birim_kodu, birim_adi, ana_agirlik_birimi, ana_birim_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('UNITCODE', sql.VarChar, birim_kodu)
        .input('UNITTEXT', sql.VarChar, birim_adi)
        .input('ISMAINUNIT', sql.Int, ana_agirlik_birimi)
        .input('MAINUNITCODE', sql.VarChar, ana_birim_kodu)
        .execute('sp_UpdateBirim');
    return result.rowsAffected[0];
};

const deleteBirimFromDB = async (birim_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('UNITCODE', sql.VarChar, birim_kodu)
        .execute('sp_DeleteBirim');
    return result.rowsAffected[0];
};

module.exports = {
    getAllBirimFromDB,
    getBirimFromDB,
    createBirimFromDB,
    updateBirimFromDB,
    deleteBirimFromDB,
};