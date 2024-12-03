const sql = require('mssql');
const config = require('../config/database');

const getAllMalzemeFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllMalzeme');
    return result.recordset;
};

const getMalzemeByIdFromDB = async (id) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('id', sql.Int, id)
        .execute('sp_GetMalzemeById');
    return result.recordset[0];
};

const createMalzemeFromDB = async (ad, miktar, birim, firma_id) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('ad', sql.NVarChar, ad)
        .input('miktar', sql.Int, miktar)
        .input('birim', sql.NVarChar, birim)
        .input('firma_id', sql.Int, firma_id)
        .execute('sp_CreateMalzeme');
};

const updateMalzemeFromDB = async (id, ad, miktar, birim, firma_id) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('ad', sql.NVarChar, ad)
        .input('miktar', sql.Int, miktar)
        .input('birim', sql.NVarChar, birim)
        .input('firma_id', sql.Int, firma_id)
        .execute('sp_UpdateMalzeme');
    return result.rowsAffected[0];
};

const deleteMalzemeFromDB = async (id) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('id', sql.Int, id)
        .execute('sp_DeleteMalzeme');
    return result.rowsAffected[0];
};

module.exports = {
    getAllMalzemeFromDB,
    getMalzemeByIdFromDB,
    createMalzemeFromDB,
    updateMalzemeFromDB,
    deleteMalzemeFromDB,
};
