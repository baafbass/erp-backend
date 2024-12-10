const sql = require('mssql');
const config = require('../../config/database');

const getAllUrunAgaciFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllUrunAgaci');
    return result.recordset;
};

const getUrunAgaciFromDB = async (urunAgaci) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, urunAgaci)
        .execute('sp_GetUrunAgaci');
    return result.recordset[0];
};

const createUrunAgaciFromDB = async (firma_kodu,urun_agaci,urun_agaci_aciklama,passif_mi) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, urun_agaci)
        .input('DOCTYPETEXT', sql.VarChar, urun_agaci_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_CreateUrunAgaci');
};

const updateUrunAgaciFromDB = async (firma_kodu,urun_agaci,urun_agaci_aciklama,passif_mi) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, urun_agaci)
        .input('DOCTYPETEXT', sql.VarChar, urun_agaci_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_UpdateUrunAgaci');
    return result.rowsAffected[0];
};

const deleteUrunAgaciFromDB = async (urun_agaci) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, urun_agaci)
        .execute('sp_DeleteUrunAgaci');
    return result.rowsAffected[0];
};

module.exports = {
    getAllUrunAgaciFromDB,
    getUrunAgaciFromDB,
    createUrunAgaciFromDB,
    updateUrunAgaciFromDB,
    deleteUrunAgaciFromDB
}