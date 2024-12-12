const sql = require('mssql');
const config = require('../../config/database');

const getAllMaliyetMerkeziFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllMaliyetMerkezi');
    return result.recordset;
};

const getMaliyetMerkeziFromDB = async (maliyet_merkezi,firma_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, maliyet_merkezi)
        .input('COMCODE',sql.VarChar,firma_kodu)
        .execute('sp_GetMaliyetMerkezi');
    return result.recordset[0];
};

const createMaliyetMerkeziFromDB = async (firma_kodu,maliyet_merkezi,maliyet_merkezi_aciklamasi,passif_mi) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, maliyet_merkezi)
        .input('DOCTYPETEXT', sql.VarChar, maliyet_merkezi_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_CreateMaliyetMerkezi');
};

const updateMaliyetMerkeziFromDB = async (firma_kodu,maliyet_merkezi,maliyet_merkezi_aciklamasi,passif_mi) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('DOCTYPE', sql.VarChar, maliyet_merkezi)
        .input('DOCTYPETEXT', sql.VarChar, maliyet_merkezi_aciklamasi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_UpdateMaliyetMerkezi');
    return result.rowsAffected[0];
};

const deleteMaliyetMerkeziFromDB = async (maliyet_merkezi,firma_kodu) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DOCTYPE', sql.VarChar, maliyet_merkezi)
        .input('COMCODE',sql.VarChar,firma_kodu)
        .execute('sp_DeleteMaliyetMerkezi');
    return result.rowsAffected[0];
};

module.exports = {
    getAllMaliyetMerkeziFromDB,
    getMaliyetMerkeziFromDB,
    createMaliyetMerkeziFromDB,
    updateMaliyetMerkeziFromDB,
    deleteMaliyetMerkeziFromDB
}