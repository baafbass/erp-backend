const sql = require('mssql');
const config = require('../../config/database')

const getAllRotaHeadFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllRotaHead');
    return result.recordset;
}

const getRotaHeadFromDB = async (keys) => {
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
        .input('ROTDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('ROTDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('ROTDOCFROM', sql.Date, gecer_bas)
        .input('ROTDOCUNTIL', sql.Date, gecer_bit)
        .input('MATDOCTYPE',sql.VarChar,malzeme_tipi)
        .input('MATDOCNUM',sql.VarChar,malzeme_kodu)
        .execute('sp_GetRotaHead');

        console.log('head',result);
    return result.recordset[0];

}

const createRotaHeadFromDB = async (rota_head) => {
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
      } = rota_head

    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('ROTDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('ROTDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('ROTDOCFROM', sql.Date, gecerlilik_bas)
        .input('ROTDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('QUANTITY', sql.Decimal, temel_miktar)
        .input('ISDELETED', sql.Int, silindi_mi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .input('DRAWNUM', sql.VarChar, cizim_numarasi)
        .execute('sp_CreateRotaHead');
}

const updateRotaHeadFromDB = async (rota_head) => {
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
      } = rota_head

    const pool = await sql.connect(config);
    await pool.request()
        .input('COMCODE', sql.VarChar, firma_kodu)
        .input('ROTDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('ROTDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('ROTDOCFROM', sql.Date, gecerlilik_bas)
        .input('ROTDOCUNTIL', sql.Date, gecerlilik_bit)
        .input('MATDOCTYPE', sql.VarChar, malzeme_tipi)
        .input('MATDOCNUM', sql.VarChar, malzeme_kodu)
        .input('QUANTITY', sql.Decimal, temel_miktar)
        .input('ISDELETED', sql.Int, silindi_mi)
        .input('ISPASSIVE', sql.Int, passif_mi)
        .input('DRAWNUM', sql.VarChar, cizim_numarasi)
        .execute('sp_UpdateRotaHead');
}

const deleteRotaHeadFromDB = async (keys) => {
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
        .input('ROTDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('ROTDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('ROTDOCFROM', sql.Date, gecer_bas)
        .input('ROTDOCUNTIL', sql.Date, gecer_bit)
        .input('MATDOCTYPE',sql.VarChar,malzeme_tipi)
        .input('MATDOCNUM',sql.VarChar,malzeme_kodu)
        .execute('sp_DeleteRotaHead');
    return result.rowsAffected[0];
}


module.exports = {
    getAllRotaHeadFromDB,
	getRotaHeadFromDB,
	createRotaHeadFromDB,
	updateRotaHeadFromDB,
	deleteRotaHeadFromDB
}