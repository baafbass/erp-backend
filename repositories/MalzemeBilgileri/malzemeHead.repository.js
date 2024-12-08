const sql = require('mssql');
const config = require('../../config/database');

const getAllMalzemeHeadFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllMalzemeHead');
    return result.recordset;
};

const getMalzemeHeadFromDB = async (keys) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit} = keys;
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('MATDOCFROM', sql.Date, gecerlilik_bas)
        .input('MATDOCUNTIL', sql.Date, gecerlilik_bit)
        .execute('sp_GetMalzemeHead');
    return result.recordset[0];
};

const createMalzemeHeadFromDB = async (params) => {
    const { 
        firma_kodu,
        malzeme_tipi,
        malzeme_kodu, 
        gecerlilik_bas,
        gecerlilik_bit,
        tedarik_tipi,
        malzeme_stok_birimi,
        net_agirlik,
        net_agirlik_birimi,
        brut_agirlik,
        brut_agirlik_birimi,
        urun_agaci_var_mi,
        urun_agaci_tipi,
        urun_agaci_kodu,
        rota_var_mi,
        r_urun_agaci_tipi,
        r_urun_agaci_kodu,
        silindi_mi,
        passif_mi
         } = params;
    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('MATDOCFROM', sql.Date, gecerlilik_bas)
        .input('MATDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('SUPPLYTYPE',sql.Int,tedarik_tipi)
        .input('STUNIT',sql.VarChar,malzeme_stok_birimi)
        .input('NETWEIGHT',sql.Decimal,net_agirlik)
        .input('NWUNIT',sql.VarChar,net_agirlik_birimi)
        .input('BRUTWEIGHT',sql.Decimal,brut_agirlik)
        .input('BWUNIT',sql.VarChar,brut_agirlik_birimi)
        .input('ISBOM',sql.Int,urun_agaci_var_mi)
        .input('BOMDOCTYPE',sql.VarChar,urun_agaci_tipi)
        .input('BOMDOCNUM',sql.VarChar,urun_agaci_kodu)
        .input('ISROUTE',sql.Int,rota_var_mi)
        .input('ROTDOCTYPE',sql.VarChar,r_urun_agaci_tipi)
        .input('ROTDOCNUM',sql.VarChar,r_urun_agaci_kodu)
        .input('ISDELETED',sql.Int,silindi_mi)
        .input('ISPASSIVE',sql.Int,passif_mi)
        .execute('sp_CreateMalzemeHead');
};

const updateMalzemeHeadFromDB = async (params) => {

const { 
        firma_kodu,
        malzeme_tipi,
        malzeme_kodu, 
        gecerlilik_bas,
        gecerlilik_bit,
        tedarik_tipi,
        malzeme_stok_birimi,
        net_agirlik,
        net_agirlik_birimi,
        brut_agirlik,
        brut_agirlik_birimi,
        urun_agaci_var_mi,
        urun_agaci_tipi,
        urun_agaci_kodu,
        rota_var_mi,
        r_urun_agaci_tipi,
        r_urun_agaci_kodu,
        silindi_mi,
        passif_mi
         } = params;

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('MATDOCFROM', sql.Date, gecerlilik_bas)
        .input('MATDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('SUPPLYTYPE',sql.Int,tedarik_tipi)
        .input('STUNIT',sql.VarChar,malzeme_stok_birimi)
        .input('NETWEIGHT',sql.Decimal,net_agirlik)
        .input('NWUNIT',sql.VarChar,net_agirlik_birimi)
        .input('BRUTWEIGHT',sql.Decimal,brut_agirlik)
        .input('BWUNIT',sql.VarChar,brut_agirlik_birimi)
        .input('ISBOM',sql.Int,urun_agaci_var_mi)
        .input('BOMDOCTYPE',sql.VarChar,urun_agaci_tipi)
        .input('BOMDOCNUM',sql.VarChar,urun_agaci_kodu)
        .input('ISROUTE',sql.Int,rota_var_mi)
        .input('ROTDOCTYPE',sql.VarChar,r_urun_agaci_tipi)
        .input('ROTDOCNUM',sql.VarChar,r_urun_agaci_kodu)
        .input('ISDELETED',sql.Int,silindi_mi)
        .input('ISPASSIVE',sql.Int,passif_mi)
        .execute('sp_UpdateMalzemeHead');
    return result.rowsAffected[0];
};

const deleteMalzemeHeadFromDB = async (keys) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit} = keys
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('MATDOCFROM', sql.Date, gecerlilik_bas)
        .input('MATDOCUNTIL', sql.Date, gecerlilik_bit)
        .execute('sp_DeleteMalzemeHead');
    return result.rowsAffected[0];
};

module.exports = {
    getAllMalzemeHeadFromDB,
    getMalzemeHeadFromDB,
    createMalzemeHeadFromDB,
    updateMalzemeHeadFromDB,
    deleteMalzemeHeadFromDB,
};
