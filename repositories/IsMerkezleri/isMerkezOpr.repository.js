const sql = require('mssql');
const config = require('../../config/database')

const getAllIsMerkezlerOprFromDB = async () => {
	const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllIsMerkezlerOpr');
    return result.recordset;
}

const getIsMerkezOprFromDB = async (keys) => {
   const {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit,
   	opr_kodu
   } = keys

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecer_bas)
        .input('WCMDOCUNTIL', sql.Date, gecer_bit)
        .input('OPRDOCTYPE', sql.VarChar, opr_kodu)
        .execute('sp_GetIsMerkezOpr');
    return result.recordset[0];
}

const createIsMerkezOprFromDB = async (is_merk_opr) => {
	const {
   	   	firma_kodu,
		is_merk_tipi,
		is_merk_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		opr_kodu
   } = is_merk_opr;

   	const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecerlilik_bas)
        .input('WCMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('OPRDOCTYPE', sql.VarChar, opr_kodu)
        .execute('sp_CreateIsMerkezOpr');
}

const updateIsMerkezOprFromDB = async (is_merk_opr) =>{
		const {
   	   	firma_kodu,
		is_merk_tipi,
		is_merk_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		opr_kodu
   } = is_merk_opr;

   	const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecerlilik_bas)
        .input('WCMDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('OPRDOCTYPE', sql.VarChar, opr_kodu)
        .execute('sp_UpdateIsMerkezOpr');
}

const deleteIsMerkezOprFromDB = async (keys) => {
  const {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit,
   	opr_kodu
   } = keys

    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('WCMDOCFROM', sql.Date, gecer_bas)
        .input('WCMDOCUNTIL', sql.Date, gecer_bit)
        .input('OPRDOCTYPE', sql.VarChar, opr_kodu)
        .execute('sp_DeleteIsMerkezOpr');
    return result.rowsAffected[0];
}

module.exports = {
    getAllIsMerkezlerOprFromDB,
	getIsMerkezOprFromDB,
	createIsMerkezOprFromDB,
	updateIsMerkezOprFromDB,
	deleteIsMerkezOprFromDB
}