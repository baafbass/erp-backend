const sql = require('mssql');
const config = require('../../config/database');

const getAllMalzemeTextFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllMalzemeText');
    return result.recordset;
};

const getMalzemeTextFromDB = async (keys) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecer_bas,gecer_bit,dil_kodu} = keys;
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('MATDOCFROM', sql.Date, gecer_bas)
        .input('MATDOCUNTIL', sql.Date, gecer_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .execute('sp_GetMalzemeText');
    return result.recordset[0];
};

const createMalzemeTextFromDB = async (fields) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu,malzeme_kisa_aciklamasi,malzeme_uzun_aciklamasi} = fields;
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('MATDOCFROM', sql.Date, gecerlilik_bas)
        .input('MATDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .input('MATSTEXT', sql.VarChar, malzeme_kisa_aciklamasi)
        .input('MATLTEXT', sql.VarChar, malzeme_uzun_aciklamasi)
        .execute('sp_CreateMalzemeText');
};

const updateMalzemeTextFromDB = async (fields) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu,malzeme_kisa_aciklamasi,malzeme_uzun_aciklamasi} = fields;
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('MATDOCFROM', sql.Date, gecerlilik_bas)
        .input('MATDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .input('MATSTEXT', sql.VarChar, malzeme_kisa_aciklamasi)
        .input('MATLTEXT', sql.VarChar, malzeme_uzun_aciklamasi)
        .execute('sp_UpdateMalzemeText');
    return result.rowsAffected[0];
};

const deleteMalzemeTextFromDB = async (keys) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecer_bas,gecer_bit,dil_kodu} = keys
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('MATDOCFROM', sql.Date, gecer_bas)
        .input('MATDOCUNTIL', sql.Date, gecer_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .execute('sp_DeleteMalzemeText');
    return result.rowsAffected[0];
};

module.exports = {
    getAllMalzemeTextFromDB,
    getMalzemeTextFromDB,
    createMalzemeTextFromDB,
    updateMalzemeTextFromDB,
    deleteMalzemeTextFromDB,
};
