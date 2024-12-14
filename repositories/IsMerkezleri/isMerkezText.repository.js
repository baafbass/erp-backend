const sql = require('mssql');
const config = require('../../config/database')

const getAllIsMerkezlerTextFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllIsMerkezlerText');
    return result.recordset;
}

const getIsMerkezTextFromDB = async (keys) => {
	const {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit,
   	dil_kodu
   } = keys

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecer_bas)
        .input('WCMDOCUNTIL', sql.Date, gecer_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .execute('sp_GetIsMerkezText');
    return result.recordset[0];
}

const createIsMerkezTextFromDB = async (is_merk_text) => {
	const {
   		firma_kodu,
		is_merk_tipi,
		is_merk_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		dil_kodu,
		is_merk_kisa_aciklamasi,
		is_merk_uzun_aciklamasi,
   } = is_merk_text

    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecerlilik_bas)
        .input('WCMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .input('WCMSTEXT', sql.VarChar, is_merk_kisa_aciklamasi)
        .input('WCMLTEXT', sql.VarChar, is_merk_uzun_aciklamasi)
        .execute('sp_CreateIsMerkezText');
}

const updateIsMerkezTextFromDB = async (is_merk_text) => {
    const {
   		firma_kodu,
		is_merk_tipi,
		is_merk_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		dil_kodu,
		is_merk_kisa_aciklamasi,
		is_merk_uzun_aciklamasi,
   } = is_merk_text

    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecerlilik_bas)
        .input('WCMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .input('WCMSTEXT', sql.VarChar, is_merk_kisa_aciklamasi)
        .input('WCMLTEXT', sql.VarChar, is_merk_uzun_aciklamasi)
        .execute('sp_UpdateIsMerkezText');
}

const deleteIsMerkezTextFromDB = async (keys) => {
   const {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit,
   	dil_kodu
   } = keys

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecer_bas)
        .input('WCMDOCUNTIL', sql.Date, gecer_bit)
        .input('LANCODE', sql.VarChar, dil_kodu)
        .execute('sp_DeleteIsMerkezText');
    return result.rowsAffected[0];
}

module.exports = {
   getAllIsMerkezlerTextFromDB,
	getIsMerkezTextFromDB,
	createIsMerkezTextFromDB,
	updateIsMerkezTextFromDB,
    deleteIsMerkezTextFromDB
}