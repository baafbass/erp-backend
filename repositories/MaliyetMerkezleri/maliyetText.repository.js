const sql = require('mssql');
const config = require('../../config/database');

const getAllMaliyetTextFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllMaliyetText');
    return result.recordset;
};

const getMaliyetTextFromDB = async (keys) => {
    const {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecer_bas,
    gecer_bit,
    dil_kodu
  } = keys;
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('CCMDOCTYPE', sql.VarChar, maliyet_merk_tipi)
        .input('CCMDOCNUM', sql.VarChar, maliyet_merk_kodu)
        .input('CCMDOCFROM', sql.Date, gecer_bas)
        .input('CCMDOCUNTIL', sql.Date, gecer_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .execute('sp_GetMaliyetText');
    return result.recordset[0];
};

const createMaliyetTextFromDB = async (maliyet_merk_text) => {
    const {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu,
    maliyet_merk_kisa_aciklamasi,
    maliyet_merk_uzun_aciklamasi
    } = maliyet_merk_text
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('CCMDOCTYPE', sql.VarChar, maliyet_merk_tipi)
        .input('CCMDOCNUM', sql.VarChar, maliyet_merk_kodu)
        .input('CCMDOCFROM', sql.Date, gecerlilik_bas)
        .input('CCMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .input('CCMSTEXT', sql.VarChar, maliyet_merk_kisa_aciklamasi)
        .input('CCMLTEXT', sql.VarChar, maliyet_merk_uzun_aciklamasi)
        .execute('sp_CreateMaliyetText');
};

const updateMaliyetTextFromDB = async (maliyet_merk_text) => {
    const {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu,
    maliyet_merk_kisa_aciklamasi,
    maliyet_merk_uzun_aciklamasi
    } = maliyet_merk_text;


    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('CCMDOCTYPE', sql.VarChar, maliyet_merk_tipi)
        .input('CCMDOCNUM', sql.VarChar, maliyet_merk_kodu)
        .input('CCMDOCFROM', sql.Date, gecerlilik_bas)
        .input('CCMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .input('CCMSTEXT', sql.VarChar, maliyet_merk_kisa_aciklamasi)
        .input('CCMLTEXT', sql.VarChar, maliyet_merk_uzun_aciklamasi)
        .execute('sp_UpdateMaliyetText');
    return result.rowsAffected[0];
};

const deleteMaliyetTextFromDB = async (keys) => {
    const {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecer_bas,
    gecer_bit,
    dil_kodu
  } = keys
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('CCMDOCTYPE', sql.VarChar, maliyet_merk_tipi)
        .input('CCMDOCNUM', sql.VarChar, maliyet_merk_kodu)
        .input('CCMDOCFROM', sql.Date, gecer_bas)
        .input('CCMDOCUNTIL', sql.Date, gecer_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .execute('sp_DeleteMaliyetText');
    return result.rowsAffected[0];
};

module.exports = {
    getAllMaliyetTextFromDB,
    getMaliyetTextFromDB,
    createMaliyetTextFromDB,
    updateMaliyetTextFromDB,
    deleteMaliyetTextFromDB,
};