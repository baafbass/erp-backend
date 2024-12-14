const sql = require('mssql');
const config = require('../../config/database');

const getAllMaliyetHeadFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllMaliyetHead');
    return result.recordset;
};

const getMaliyetHeadFromDB = async (keys) => {  
    const {
        firma_kodu,
        maliyet_merk_tipi,
        maliyet_merk_kodu,
        gecer_bas,
        gecer_bit
         } = keys;
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('CCMDOCTYPE', sql.VarChar, maliyet_merk_tipi)
        .input('CCMDOCNUM', sql.VarChar, maliyet_merk_kodu)
        .input('CCMDOCFROM', sql.Date, gecer_bas)
        .input('CCMDOCUNTIL', sql.Date, gecer_bit)
        .execute('sp_GetMaliyetHead');
    return result.recordset[0];
};

const createMaliyetHeadFromDB = async (maliyet_merk_head) => {
    const {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    ana_maliyet_merk_tipi,
    ana_maliyet_merk_kodu,
    silindi_mi,
    passif_mi,} = maliyet_merk_head;

    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('CCMDOCTYPE', sql.VarChar, maliyet_merk_tipi)
        .input('CCMDOCNUM', sql.VarChar, maliyet_merk_kodu)
        .input('CCMDOCFROM', sql.Date, gecerlilik_bas)
        .input('CCMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MAINCCMDOCTYPE', sql.VarChar, ana_maliyet_merk_tipi)
        .input('MAINCCMDOCNUM', sql.VarChar, ana_maliyet_merk_kodu)
        .input('ISDELETED', sql.Int, silindi_mi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_CreateMaliyetHead');
};

const updateMaliyetHeadFromDB = async (maliyet_merk_head) => {
    const {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    ana_maliyet_merk_tipi,
    ana_maliyet_merk_kodu,
    silindi_mi,
    passif_mi,} = maliyet_merk_head;

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('CCMDOCTYPE', sql.VarChar, maliyet_merk_tipi)
        .input('CCMDOCNUM', sql.VarChar, maliyet_merk_kodu)
        .input('CCMDOCFROM', sql.Date, gecerlilik_bas)
        .input('CCMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MAINCCMDOCTYPE', sql.VarChar, ana_maliyet_merk_tipi)
        .input('MAINCCMDOCNUM', sql.VarChar, ana_maliyet_merk_kodu)
        .input('ISDELETED', sql.Int, silindi_mi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_UpdateMaliyetHead');
    return result.rowsAffected[0];
};

const deleteMaliyetHeadFromDB = async (keys) => {
    const {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecer_bas,
    gecer_bit
  } = keys
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('CCMDOCTYPE', sql.VarChar, maliyet_merk_tipi)
        .input('CCMDOCNUM', sql.VarChar, maliyet_merk_kodu)
        .input('CCMDOCFROM', sql.Date, gecer_bas)
        .input('CCMDOCUNTIL', sql.Date, gecer_bit)
        .execute('sp_DeleteMaliyetHead');
    return result.rowsAffected[0];
};

module.exports = {
    getAllMaliyetHeadFromDB,
    getMaliyetHeadFromDB,
    createMaliyetHeadFromDB,
    updateMaliyetHeadFromDB,
    deleteMaliyetHeadFromDB,
};