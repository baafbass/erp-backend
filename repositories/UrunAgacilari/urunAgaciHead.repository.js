const sql = require('mssql');
const config = require('../../config/database');

const getAllUrunAgaciHeadFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllUrunAgaciHead');
    return result.recordset;
};

const getUrunAgaciHeadFromDB = async (keys) => {
    const {
        firma_kodu,
        urun_agaci_tipi,
        urun_agaci_kodu,
        gecer_bas,
        gecer_bit,
        malzeme_tipi,
        malzeme_kodu
    } = keys;

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('BOMDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('BOMDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('BOMDOCFROM', sql.Date, gecer_bas)
        .input('BOMDOCUNTIL', sql.Date, gecer_bit)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .execute('sp_GetUrunAgaciHead');
    return result.recordset[0];
};

const createUrunAgaciHeadFromDB = async (urun_agaci_head) => {
    
    const {
        firma_kodu,
        urun_agaci_tipi,
        urun_agaci_kodu,
        gecerlilik_bas,
        gecerlilik_bit,
        malzeme_tipi,
        malzeme_kodu,
        temel_miktar,
        silindi_mi,
        passif_mi,
        cizim_numarasi
   } = urun_agaci_head;

    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('BOMDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('BOMDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('BOMDOCFROM', sql.Date, gecerlilik_bas)
        .input('BOMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('QUANTITY', sql.Decimal(5,2), temel_miktar)
        .input('ISDELETED', sql.Int, silindi_mi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .input('DRAWNUM', sql.VarChar, cizim_numarasi)
        .execute('sp_CreateUrunAgaciHead');
};

const updateUrunAgaciHeadFromDB = async (urun_agaci_head) => {
    const {
        firma_kodu,
        urun_agaci_tipi,
        urun_agaci_kodu,
        gecerlilik_bas,
        gecerlilik_bit,
        malzeme_tipi,
        malzeme_kodu,
        temel_miktar,
        silindi_mi,
        passif_mi,
        cizim_numarasi
   } = urun_agaci_head;

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('BOMDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('BOMDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('BOMDOCFROM', sql.Date, gecerlilik_bas)
        .input('BOMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('QUANTITY', sql.Decimal(5,2), temel_miktar)
        .input('ISDELETED', sql.Int, silindi_mi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .input('DRAWNUM', sql.VarChar, cizim_numarasi)
        .execute('sp_UpdateUrunAgaciHead');
    return result.rowsAffected[0];
};

const deleteUrunAgaciHeadFromDB = async (keys) => {
    const {
        firma_kodu,
        urun_agaci_tipi,
        urun_agaci_kodu,
        gecer_bas,
        gecer_bit,
        malzeme_tipi,
        malzeme_kodu
    } = keys

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('BOMDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('BOMDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('BOMDOCFROM', sql.Date, gecer_bas)
        .input('BOMDOCUNTIL', sql.Date, gecer_bit)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .execute('sp_DeleteUrunAgaciHead');
    return result.rowsAffected[0];
};

module.exports = {
    getAllUrunAgaciHeadFromDB,
    getUrunAgaciHeadFromDB,
    createUrunAgaciHeadFromDB,
    updateUrunAgaciHeadFromDB,
    deleteUrunAgaciHeadFromDB,
};