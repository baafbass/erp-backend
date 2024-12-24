const {
   getAllRotaBOM,
   getRotaBOM,
   createRotaBOM,
   updateRotaBOM,
   deleteRotaBOM
} = require('./rotalarBomContent.controller')

const {
   getAllRotaHead,
   getRotaHead,
   createRotaHead,
   updateRotaHead,
   deleteRotaHead
} = require('./rotalarHead.controller')

const {
	getAllRotaOpr,
	getRotaOpr,
	createRotaOpr,
	updateRotaOpr,
	deleteRotaOpr
} = require('./rotalarOprContent.controller')


const getAllRotalar = async (req,res) =>{
 try {
    const headRotalari = await getAllRotaHead();
    const bomRotalari = await getAllRotaBOM();
    const oprRotalari = await getAllRotaOpr();

    const rotalar = bomRotalari.map((bomRota) => {
      const matchingHead = headRotalari.find(
        (headRota) =>
          bomRota.COMCODE === headRota.COMCODE &&
          bomRota.BOMDOCTYPE === headRota.ROTDOCTYPE &&
          bomRota.BOMDOCNUM === headRota.ROTDOCNUM &&
          bomRota.ROTDOCFROM.getTime() === headRota.ROTDOCFROM.getTime() &&
          bomRota.ROTDOCUNTIL.getTime() === headRota.ROTDOCUNTIL.getTime() &&
          bomRota.MATDOCTYPE === headRota.MATDOCTYPE &&
          bomRota.MATDOCNUM === headRota.MATDOCNUM
      );

      const matchingOpr = oprRotalari.find(
        (oprRota) =>
          bomRota.COMCODE === oprRota.COMCODE &&
          bomRota.ROTDOCTYPE === oprRota.ROTDOCTYPE &&
          bomRota.ROTDOCNUM === oprRota.ROTDOCNUM &&
          bomRota.ROTDOCFROM.getTime() === oprRota.ROTDOCFROM.getTime() &&
          bomRota.ROTDOCUNTIL.getTime() === oprRota.ROTDOCUNTIL.getTime() &&
          bomRota.MATDOCTYPE === oprRota.MATDOCTYPE &&
          bomRota.MATDOCNUM === oprRota.MATDOCNUM &&
          bomRota.OPRNUM === oprRota.OPRNUM
      );

      if (matchingHead && matchingOpr) {
        return {
          ...bomRota,
          ...matchingHead,
          ...matchingOpr,
          ISPASSIVE:bomRota.ISPASSIVE === 1 ? "Evet" : "Hayır",
          ISDELETED:bomRota.ISDELETED ===  1 ? "Evet" : "Hayır",
          ROTDOCFROM: bomRota.ROTDOCFROM.toISOString().split('T')[0],
          ROTDOCUNTIL: bomRota.ROTDOCUNTIL.toISOString().split('T')[0]
        };
      }
      return null;
    }).filter((item) => item !== null);
   
    res.status(200).json({
      status: "OK",
      rotalar
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const getRota = async (req,res) => {
  const {
   firma_kodu,
   urun_agaci_tipi,
   urun_agaci_kodu,
   gecer_bas,
   gecer_bit,
   malzeme_tipi,
   malzeme_kodu,
   rota_tipi,
   rota_numarasi,
   opr_numarasi,
   icerik_numarasi
  } = req.params;

  const headKeys = {
  	firma_kodu,
  	urun_agaci_tipi,
  	urun_agaci_kodu,
  	gecer_bas,
  	gecer_bit,
  	malzeme_tipi,
  	malzeme_kodu
  }

  const bomKeys = {
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
  }

  const oprKeys = {
  	firma_kodu,
  	rota_tipi,
  	rota_numarasi,
  	gecer_bas,
  	gecer_bit,
  	malzeme_tipi,
  	malzeme_kodu,
  	opr_numarasi
  }

  try{
   	const rotaHead = await getRotaHead(headKeys);
   	const rotaBOM = await getRotaBOM(bomKeys);
   	const rotaOpr = await getRotaOpr(oprKeys);

   	if(!rotaHead || !rotaBOM || !rotaOpr){
   		return res.status(404).json({
   			message:'Rota Head or BOM or Operation not found',
   		})
   	}

   	const rota = {
   		...rotaHead,
   		...rotaBOM,
   		...rotaOpr
   	}

    console.log(rota)

   	res.status(200).json({
   		status:"OK",
   		rota
   	})

   } catch(error){
   	res.status(500).json({
   		message:error.message,
   	})
   }
}

const createRota = async (req,res) => {
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
      	cizim_numarasi,
      	rota_tipi,
      	rota_numarasi,
      	operasyon_num,
      	is_merk_tipi,
      	is_merk_kodu,
      	operasyon_kodu,
      	opr_hazirlik_suresi,
      	opr_makine_suresi,
      	opr_iscilik_suresi,
      	icerik_numarasi,
        bilesen_kodu,
        bilesen_miktari
      } = req.body;

      if(
      	!firma_kodu ||
      	!urun_agaci_tipi ||
      	!urun_agaci_kodu ||
      	!gecerlilik_bas ||
      	!gecerlilik_bit ||
      	!malzeme_tipi ||
      	!malzeme_kodu ||
      	!rota_tipi ||
      	!rota_numarasi ||
      	!operasyon_num ||
      	!icerik_numarasi){
      	res.status(400).json({
      		message:'Invalid Inputs',
      	})
      }

      const rota_head = {
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
      }

      const rota_BOM = {
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
      }

      const rota_opr = {
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
      }

      try{
      	await createRotaHead(rota_head);
      	await createRotaBOM(rota_BOM);
      	await createRotaOpr(rota_opr);

      	res.status(201).json({
      		status:'OK',
      		message:'Rota created successfully'
      	})

      } catch(error){
      	res.status(500).json({
      		message:error.message,
      	})
      }
}

const updateRota = async (req,res) => {
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
      	cizim_numarasi,
      	rota_tipi,
      	rota_numarasi,
      	operasyon_num,
      	is_merk_tipi,
      	is_merk_kodu,
      	operasyon_kodu,
      	opr_hazirlik_suresi,
      	opr_makine_suresi,
      	opr_iscilik_suresi,
      	icerik_numarasi,
        bilesen_kodu,
        bilesen_miktari
      } = req.body;

      if(
      	!firma_kodu ||
      	!urun_agaci_tipi ||
      	!urun_agaci_kodu ||
      	!gecerlilik_bas ||
      	!gecerlilik_bit ||
      	!malzeme_tipi ||
      	!malzeme_kodu ||
      	!rota_tipi ||
      	!rota_numarasi ||
      	!operasyon_num ||
      	!icerik_numarasi){
      	res.status(400).json({
      		message:'Invalid Inputs',
      	})
      }

      const rota_head = {
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
      	cizim_numarasi,
      	operasyon_num,
      }

      const rota_BOM = {
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
      }

      const rota_opr = {
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
      }

      try{
      	await updateRotaHead(rota_head);
      	await updateRotaBOM(rota_BOM);
      	await updateRotaOpr(rota_opr);

      	res.status(200).json({
      		status:'OK',
      		message:'Rota updated successfully'
      	})

      } catch(error){
      	res.status(500).json({
      		message:'Rota updated successfully',
      	})
      }
}

const deleteRota = async (req,res) => {
 
  const {
   firma_kodu,
   urun_agaci_tipi,
   urun_agaci_kodu,
   gecer_bas,
   gecer_bit,
   malzeme_tipi,
   malzeme_kodu,
   rota_tipi,
   rota_numarasi,
   opr_numarasi,
   icerik_numarasi
  } = req.params;

 const headKeys = {
  	firma_kodu,
  	urun_agaci_tipi,
  	urun_agaci_kodu,
  	gecer_bas,
  	gecer_bit,
  	malzeme_tipi,
  	malzeme_kodu
  }

  const bomKeys = {
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
  }

  const oprKeys = {
  	firma_kodu,
  	rota_tipi,
  	rota_numarasi,
  	gecer_bas,
  	gecer_bit,
  	malzeme_tipi,
  	malzeme_kodu,
  	opr_numarasi
  }

  try{
  	const deletedRotaHead = await deleteRotaHead(headKeys);
  	const deletedRotaBOM = await deleteRotaBOM(bomKeys);
  	const deletedRotaOpr = await deleteRotaOpr(oprKeys);

  	if (deletedRotaBOM === 0 || deleteRotaHead === 0 || deleteRotaOpr === 0){
  		return res.status(404).json({
  			message:'Rota Head or BOM or Operation not found',
  		})
  	}

  	res.status(200).json({
  		status:'OK',
  		message:'Rota deleted successfully'
  	})

  } catch(error){
  	res.status(500).json({
  		message:error.message
  	})
  }
}

module.exports = {
	getAllRotalar,
	getRota,
	createRota,
	updateRota,
	deleteRota
}