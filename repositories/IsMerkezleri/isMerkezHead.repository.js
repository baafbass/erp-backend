const sql = require('mssql');
const config = require('../../config/database')

const getAllIsMerkezlerHeadFromDB = async () =>{
	const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllIsMerkezlerHead');
    return result.recordset;
}

const getIsMerkezHeadFromDB = async (keys) =>{
	const {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit
   } = keys

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecer_bas)
        .input('WCMDOCUNTIL', sql.Date, gecer_bit)
        .execute('sp_GetIsMerkezHead');
    return result.recordset[0];
}

const createIsMerkezHeadFromDB = async (is_merk_head) => {
	const {
		firma_kodu,
		is_merk_tipi,
		is_merk_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		ana_is_merk_tipi,
		ana_is_merk_kodu,
		maliyet_merk_tipi,
		maliyet_merk_kodu,
		gunluk_calisma_suresi,
		silindi_mi,
		passif_mi,
	} = is_merk_head

	const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecerlilik_bas)
        .input('WCMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MAINWCMDOCTYPE', sql.VarChar, ana_is_merk_tipi)
        .input('MAINWCMDOCNUM', sql.VarChar, ana_is_merk_kodu)
        .input('CCMDOCTYPE', sql.VarChar, maliyet_merk_tipi)
        .input('CCMDOCNUM', sql.VarChar, maliyet_merk_kodu)
        .input('WORKTIME', sql.Decimal, gunluk_calisma_suresi)
        .input('ISDELETED', sql.Int, silindi_mi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_CreateIsMerkezHead');
}

const updateIsMerkezHeadFromDB = async (is_merk_head) => {
     	const {
		firma_kodu,
		is_merk_tipi,
		is_merk_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		ana_is_merk_tipi,
		ana_is_merk_kodu,
		maliyet_merk_tipi,
		maliyet_merk_kodu,
		gunluk_calisma_suresi,
		silindi_mi,
		passif_mi,
	} = is_merk_head

	const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecerlilik_bas)
        .input('WCMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MAINWCMDOCTYPE', sql.VarChar, ana_is_merk_tipi)
        .input('MAINWCMDOCNUM', sql.VarChar, ana_is_merk_kodu)
        .input('CCMDOCTYPE', sql.VarChar, maliyet_merk_tipi)
        .input('CCMDOCNUM', sql.VarChar, maliyet_merk_kodu)
        .input('WORKTIME', sql.Decimal, gunluk_calisma_suresi)
        .input('ISDELETED', sql.Int, silindi_mi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .execute('sp_UpdateIsMerkezHead');
}

const deleteIsMerkezHeadFromDB = async (keys) => {
	const {
    firma_kodu,
    is_merk_tipi,
    is_merk_kodu,
    gecer_bas,
    gecer_bit
  } = keys
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecer_bas)
        .input('WCMDOCUNTIL', sql.Date, gecer_bit)
        .execute('sp_DeleteIsMerkezHead');
    return result.rowsAffected[0];
}

module.exports = {
	getAllIsMerkezlerHeadFromDB,
	getIsMerkezHeadFromDB,
	createIsMerkezHeadFromDB,
	updateIsMerkezHeadFromDB,
	deleteIsMerkezHeadFromDB,
}