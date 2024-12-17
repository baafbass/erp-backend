const sql = require('mssql');
const config = require('../../config/database');

const getAllUrunAgaciContentFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllUrunAgaciContent');
    return result.recordset;
};

const getUrunAgaciContentFromDB = async (keys) => {
    const {
        firma_kodu,
        urun_agaci_tipi,
        urun_agaci_kodu,
        gecer_bas,
        gecer_bit,
        malzeme_tipi,
        malzeme_kodu,
        icerik_numarasi
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
        .input('CONTENTNUM', sql.Int, icerik_numarasi)
        .execute('sp_GetUrunAgaciContent');
    return result.recordset[0];
};

const createUrunAgaciContentFromDB = async (urun_agaci_content) => {
    
    const {
        firma_kodu,
        urun_agaci_tipi,
        urun_agaci_kodu,
        gecerlilik_bas,
        gecerlilik_bit,
        malzeme_tipi,
        malzeme_kodu,
        icerik_numarasi,
        bilesen_kodu,
        kalem_urun_agaci_tipi,
        kalem_urun_agaci_kodu,
        bilesen_miktari
   } = urun_agaci_content

    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('BOMDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('BOMDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('BOMDOCFROM', sql.Date, gecerlilik_bas)
        .input('BOMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('CONTENTNUM', sql.Int, icerik_numarasi)
        .input('COMPONENT', sql.VarChar, bilesen_kodu)
        .input('COMBOMDOCTYPE', sql.VarChar, kalem_urun_agaci_tipi)
        .input('COMBOMDOCNUM', sql.VarChar, kalem_urun_agaci_kodu)
        .input('QUANTITY', sql.Decimal(5,2), bilesen_miktari)
        .execute('sp_CreateUrunAgaciContent');
};

const updateUrunAgaciContentFromDB = async (urun_agaci_content) => {
    
    const {
        firma_kodu,
        urun_agaci_tipi,
        urun_agaci_kodu,
        gecerlilik_bas,
        gecerlilik_bit,
        malzeme_tipi,
        malzeme_kodu,
        icerik_numarasi,
        bilesen_kodu,
        kalem_urun_agaci_tipi,
        kalem_urun_agaci_kodu,
        bilesen_miktari
   } = urun_agaci_content

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('BOMDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('BOMDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('BOMDOCFROM', sql.Date, gecerlilik_bas)
        .input('BOMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('CONTENTNUM', sql.Int, icerik_numarasi)
        .input('COMPONENT', sql.VarChar, bilesen_kodu)
        .input('COMBOMDOCTYPE', sql.VarChar, kalem_urun_agaci_tipi)
        .input('COMBOMDOCNUM', sql.VarChar, kalem_urun_agaci_kodu)
        .input('QUANTITY', sql.Decimal(5,2), bilesen_miktari)
        .execute('sp_UpdateUrunAgaciContent');
    return result.rowsAffected[0];
};

const deleteUrunAgaciContentFromDB = async (keys) => {
    const {
        firma_kodu,
        urun_agaci_tipi,
        urun_agaci_kodu,
        gecer_bas,
        gecer_bit,
        malzeme_tipi,
        malzeme_kodu,
        icerik_numarasi
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
        .input('CONTENTNUM', sql.Int, icerik_numarasi)
        .execute('sp_DeleteUrunAgaciContent');
    return result.rowsAffected[0];
};

module.exports = {
    getAllUrunAgaciContentFromDB,
    getUrunAgaciContentFromDB,
    createUrunAgaciContentFromDB,
    updateUrunAgaciContentFromDB,
    deleteUrunAgaciContentFromDB,
};