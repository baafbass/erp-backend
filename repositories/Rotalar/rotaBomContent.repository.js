const sql = require('mssql');
const config = require('../../config/database');

const getAllRotaBOMFromDB = async () => {
    const pool = await sql.connect(config);
    const result = await pool.request().execute('sp_GetAllRotaBom');
    return result.recordset;
}

const getRotaBOMFromDB = async (keys) => {
	const {
    firma_kodu,
  	rota_tipi,
  	rota_numarasi,
  	gecer_bas,
  	gecer_bit,
  	malzeme_tipi,
  	malzeme_kodu,
  	opr_numarasi,
  	urun_agaci_tipi,
  	urun_agaci_kodu,
  	icerik_numarasi
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
        .input('BOMDOCTYPE',sql.VarChar,urun_agaci_tipi)
        .input('BOMDOCNUM',sql.VarChar,urun_agaci_kodu)
        .input('CONTENTNUM',sql.Int,icerik_numarasi)
        .execute('sp_GetRotaBom');
        console.log('con',result)
    return result.recordset[0];
   
}

const createRotaBOMFromDB = async (rota_bom) => {

	const {
	   firma_kodu,
       rota_tipi,
       rota_numarasi,
       gecerlilik_bas,
       gecerlilik_bit,
       malzeme_tipi,
       malzeme_kodu,
       operasyon_num,
       urun_agaci_tipi,
       urun_agaci_kodu,
       icerik_numarasi,
       bilesen_kodu,
       bilesen_miktari
	} = rota_bom

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
        .input('BOMDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('BOMDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('CONTENTNUM', sql.Int, icerik_numarasi)
        .input('COMPONENT', sql.VarChar, bilesen_kodu)
        .input('QUANTITY',sql.Decimal,bilesen_miktari)
        .execute('sp_CreateRotaBom');
}

const updateRotaBOMFromDB = async (rota_bom) => {
  	const {
	   firma_kodu,
       rota_tipi,
       rota_numarasi,
       gecerlilik_bas,
       gecerlilik_bit,
       malzeme_tipi,
       malzeme_kodu,
       operasyon_num,
       urun_agaci_tipi,
       urun_agaci_kodu,
       icerik_numarasi,
       bilesen_kodu,
       bilesen_miktari
	} = rota_bom

    console.log(
       firma_kodu,
       rota_tipi,
       rota_numarasi,
       gecerlilik_bas,
       gecerlilik_bit,
       malzeme_tipi,
       malzeme_kodu,
       operasyon_num,
       urun_agaci_tipi,
       urun_agaci_kodu,
       icerik_numarasi,
       bilesen_kodu,
       bilesen_miktari
        )

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
        .input('BOMDOCTYPE', sql.VarChar, urun_agaci_tipi)
        .input('BOMDOCNUM', sql.VarChar, urun_agaci_kodu)
        .input('CONTENTNUM', sql.Int, icerik_numarasi)
        .input('COMPONENT', sql.VarChar, bilesen_kodu)
        .input('QUANTITY',sql.Decimal,bilesen_miktari)
        .execute('sp_UpdateRotaBom');
}

const deleteRotaBOMFromDB = async (keys) => {
     const {
    firma_kodu,
  	rota_tipi,
  	rota_numarasi,
  	gecer_bas,
  	gecer_bit,
  	malzeme_tipi,
  	malzeme_kodu,
  	opr_numarasi,
  	urun_agaci_tipi,
  	urun_agaci_kodu,
  	icerik_numarasi
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
        .input('BOMDOCTYPE',sql.VarChar,urun_agaci_tipi)
        .input('BOMDOCNUM',sql.VarChar,urun_agaci_kodu)
        .input('CONTENTNUM',sql.Int,icerik_numarasi)
        .execute('sp_DeleteRotaBom');
    return result.rowsAffected[0];
}

module.exports = {
	getAllRotaBOMFromDB,
	getRotaBOMFromDB,
	createRotaBOMFromDB,
	updateRotaBOMFromDB,
	deleteRotaBOMFromDB
}