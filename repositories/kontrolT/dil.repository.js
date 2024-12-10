const sql = require('mssql');
const config = require('../../config/database');

const getAllDilFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllDil');
    return result.recordset;
};

const getDilFromDB = async (dil_kodu,firma_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('LANCODE', sql.VarChar, dil_kodu)
        .input('COMCODE',sql.VarChar,firma_kodu)
        .execute('sp_GetDil');
    return result.recordset[0];
};

const createDilFromDB = async (firma_kodu,dil_kodu, dil_adi) => {
    console.log("repo",firma_kodu,dil_kodu,dil_adi)
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .input('LANTEXT', sql.VarChar, dil_adi)
        .execute('sp_CreateDil');
};

const updateDilFromDB = async (firma_kodu,dil_kodu, dil_adi) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .input('LANTEXT', sql.VarChar, dil_adi)
        .execute('sp_UpdateDil');
    return result.rowsAffected[0];
};

const deleteDilFromDB = async (dil_kodu,firma_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('LANCODE', sql.VarChar, dil_kodu)
        .input('COMCODE',sql.VarChar,firma_kodu)
        .execute('sp_DeleteDil');
    return result.rowsAffected[0];
};

module.exports = {
    getAllDilFromDB,
    getDilFromDB,
    createDilFromDB,
    updateDilFromDB,
    deleteDilFromDB
}