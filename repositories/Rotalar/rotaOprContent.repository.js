const sql = require('mssql');
const config = require('../../config/database')

const getAllRotaOprFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllRotaOpr');
    return result.recordset;
}

const getRotaOprFromDB = async (keys) => {
	const {
  	firma_kodu,
  	rota_tipi,
  	rota_numarasi,
  	gecer_bas,
  	gecer_bit,
  	malzeme_tipi,
  	malzeme_kodu,
  	opr_numarasi
  } = keys

  const pool = await sql.connect(config);
    const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('ROTDOCTYPE', sql.VarChar, rota_tipi)
        .input('ROTDOCNUM', sql.VarChar, rota_numarasi)
        .input('ROTDOCFROM', sql.Date, gecer_bas)
        .input('ROTDOCUNTIL', sql.Date, gecer_bit)
        .input('MATDOCTYPE',sql.VarChar,malzeme_tipi)
        .input('MATDOCNUM',sql.VarChar,malzeme_kodu)
        .input('OPRNUM',sql.Int,opr_numarasi)
        .execute('sp_GetRotaOpr');
    return result.recordset[0];

}

const createRotaOprFromDB = async (rota_opr) => {

	const {
        firma_kodu,
        rota_tipi,
        rota_numarasi,
        gecerlilik_bas,
        gecerlilik_bit,
        malzeme_tipi,
        malzeme_kodu,
        operasyon_num,
        is_merk_tipi,
      	is_merk_kodu,
      	operasyon_kodu,
      	opr_hazirlik_suresi,
      	opr_makine_suresi,
      	opr_iscilik_suresi
      } = rota_opr

    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('ROTDOCTYPE', sql.VarChar, rota_tipi)
        .input('ROTDOCNUM', sql.VarChar, rota_numarasi)
        .input('ROTDOCFROM', sql.Date, gecerlilik_bas)
        .input('ROTDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('OPRNUM', sql.Int, operasyon_num)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('OPRDOCTYPE',sql.VarChar,operasyon_kodu)
        .input('SETUPTIME', sql.Decimal(3,2), opr_hazirlik_suresi)
        .input('MACHINETIME', sql.Decimal(3,2), opr_makine_suresi)
        .input('LABOURTIME',sql.Decimal(3,2),opr_iscilik_suresi)
        .execute('sp_CreateRotaOpr');
}

const updateRotaOprFromDB = async (rota_opr) => {
      	const {
        firma_kodu,
        rota_tipi,
        rota_numarasi,
        gecerlilik_bas,
        gecerlilik_bit,
        malzeme_tipi,
        malzeme_kodu,
        operasyon_num,
        is_merk_tipi,
      	is_merk_kodu,
      	operasyon_kodu,
      	opr_hazirlik_suresi,
      	opr_makine_suresi,
      	opr_iscilik_suresi
      } = rota_opr

    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('ROTDOCTYPE', sql.VarChar, rota_tipi)
        .input('ROTDOCNUM', sql.VarChar, rota_numarasi)
        .input('ROTDOCFROM', sql.Date, gecerlilik_bas)
        .input('ROTDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('OPRNUM', sql.Int, operasyon_num)
        .input('WCMDOCTYPE', sql.VarChar, is_merk_tipi)
        .input('WCMDOCNUM', sql.VarChar, is_merk_kodu)
        .input('OPRDOCTYPE',sql.VarChar,operasyon_kodu)
        .input('SETUPTIME', sql.Decimal(3,2), opr_hazirlik_suresi)
        .input('MACHINETIME', sql.Decimal(3,2), opr_makine_suresi)
        .input('LABOURTIME',sql.Decimal(3,2),opr_iscilik_suresi)
        .execute('sp_UpdateRotaOpr');
}

const deleteRotaOprFromDB = async (keys) => {
  const {
  	firma_kodu,
  	rota_tipi,
  	rota_numarasi,
  	gecer_bas,
  	gecer_bit,
  	malzeme_tipi,
  	malzeme_kodu,
  	opr_numarasi
  } = keys

   const pool = await sql.connect(config);
   const result = await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('ROTDOCTYPE', sql.VarChar, rota_tipi)
        .input('ROTDOCNUM', sql.VarChar, rota_numarasi)
        .input('ROTDOCFROM', sql.Date, gecer_bas)
        .input('ROTDOCUNTIL', sql.Date, gecer_bit)
        .input('MATDOCTYPE',sql.VarChar,malzeme_tipi)
        .input('MATDOCNUM',sql.VarChar,malzeme_kodu)
        .input('OPRNUM',sql.Int,opr_numarasi)
        .execute('sp_DeleteRotaOpr');
    return result.rowsAffected[0];
}

module.exports = {
    getAllRotaOprFromDB,
	getRotaOprFromDB,
	createRotaOprFromDB,
	updateRotaOprFromDB,
	deleteRotaOprFromDB
}