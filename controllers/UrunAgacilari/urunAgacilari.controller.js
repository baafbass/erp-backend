const {
	getAllUrunAgaciHead,
    getUrunAgaciHead,
    createUrunAgaciHead,
    updateUrunAgaciHead,
    deleteUrunAgaciHead,
} = require('./urunAgaciHead.controller')

const {
	getAllUrunAgaciContent,
    getUrunAgaciContent,
    createUrunAgaciContent,
    updateUrunAgaciContent,
    deleteUrunAgaciContent,
} = require('./urunAgaciContent.controller')


const getAllUrunAgacilari = async (req,res) => {
	try{
		const headUrunAgacilari = await getAllUrunAgaciHead();
		const contentUrunAgacilari = await getAllUrunAgaciContent();

		const urunAgacilari = headUrunAgacilari.map((urunAgaciHead)=>{
			const matchingContent = contentUrunAgacilari.find((urunAgaciContent)=>
                urunAgaciHead.COMCODE === urunAgaciContent.COMCODE &&
                urunAgaciHead.BOMDOCTYPE === urunAgaciContent.BOMDOCTYPE &&
                urunAgaciHead.BOMDOCNUM === urunAgaciContent.BOMDOCNUM &&
                urunAgaciHead.BOMDOCFROM.getTime() === urunAgaciContent.BOMDOCFROM.getTime() &&
                urunAgaciHead.BOMDOCUNTIL.getTime() === urunAgaciContent.BOMDOCUNTIL.getTime() &&
                urunAgaciHead.MATDOCTYPE === urunAgaciContent.MATDOCTYPE &&
                urunAgaciHead.MATDOCNUM === urunAgaciContent.MATDOCNUM
				)

			if(matchingContent){
				return {
					...urunAgaciHead,
					...matchingContent
				}
			}
			return null
		}).filter((item)=> item !== null)
     
     res.status(200).json({
      status:"OK",
      urunAgacilari
  })
	}catch(error){
		res.status(500).json({
			error:error.message,
		})
	}
}

const getUrunAgaci = async (req,res) =>{
    const {
    	firma_kodu,
    	urun_agaci_tipi,
    	urun_agaci_kodu,
    	gecer_bas,
    	gecer_bit,
    	malzeme_tipi,
    	malzeme_kodu,
    	icerik_numarasi
    } = req.params;

    const headKeys = {
    	firma_kodu,
    	urun_agaci_tipi,
    	urun_agaci_kodu,
    	gecer_bas,
    	gecer_bit,
    	malzeme_tipi,
    	malzeme_kodu,
    }

    const contentKeys = {
    	firma_kodu,
    	urun_agaci_tipi,
    	urun_agaci_kodu,
    	gecer_bas,
    	gecer_bit,
    	malzeme_tipi,
    	malzeme_kodu,
    	icerik_numarasi
    }

    try {
  	const urunAgaciHead = await getUrunAgaciHead(headKeys);
  	const urunAgaciContent = await getUrunAgaciContent(contentKeys);

  	if(!urunAgaciHead || !urunAgaciContent){
  		return res.status(404).json({
  			message:"Urun Agaci Head or Content not found."
  		})
  	}

  	const urunAgaci = {
  		...urunAgaciHead,
  		...urunAgaciContent
  	}

  	res.status(200).json({
  		status:"OK",
  		urunAgaci
  	})

  } catch(error){
  	res.status(500).json({
  		message:error.message
  	})
  }
}

const createUrunAgaci = async (req,res) => {

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
		icerik_numarasi,
		bilesen_kodu,
		kalem_urun_agaci_tipi,
		kalem_urun_agaci_kodu,
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
		!icerik_numarasi){
		res.status(400).json({
			message:'Invalid Inputs',
		})
	}

   const urun_agaci_head = {
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

   const urun_agaci_content = {
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
   }

   try{
        await createUrunAgaciHead(urun_agaci_head);
        await createUrunAgaciContent(urun_agaci_content);
        
        res.status(201).json({
        	status:"OK",
        	message:"Urun Agaci created successfully"
        })
	} catch(error){
		res.status(500).json({
			message:error.message
		})
	}

}

const updateUrunAgaci = async (req,res) => {
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
		icerik_numarasi,
		bilesen_kodu,
		kalem_urun_agaci_tipi,
		kalem_urun_agaci_kodu,
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
		!icerik_numarasi){
		res.status(400).json({
			message:'Invalid Inputs',
		})
	}

   const urun_agaci_head = {
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

   const urun_agaci_content = {
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
   }

   try{
        await updateUrunAgaciHead(urun_agaci_head);
        await updateUrunAgaciContent(urun_agaci_content);
        
        res.status(201).json({
        	status:"OK",
        	message:"Urun Agaci updated successfully"
        })
	} catch(error){
		res.status(500).json({
			message:error.message
		})
	}
}

const deleteUrunAgaci = async (req,res) => {

	const {
		firma_kodu,
    	urun_agaci_tipi,
    	urun_agaci_kodu,
    	gecer_bas,
    	gecer_bit,
    	malzeme_tipi,
    	malzeme_kodu,
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

	const contentKeys = {
	    firma_kodu,
    	urun_agaci_tipi,
    	urun_agaci_kodu,
    	gecer_bas,
    	gecer_bit,
    	malzeme_tipi,
    	malzeme_kodu,
    	icerik_numarasi
	}

	try{
  	const deletedUrunAgaciHead = await deleteUrunAgaciHead(headKeys);
  	const deletedUrunAgaciContent = await deleteUrunAgaciContent(contentKeys);

  	if(deletedUrunAgaciHead === 0 || deletedAgaciContent === 0 ){
  		return res.status(404).json({
  			message:"Urun Agaci Head or Content was not found"
  		})
  	}

  	res.status(200).json({
  		status:"OK",
  		message:'Urun Agaci deleted successfully'
  	})

  } catch(error){
  	res.status(500).json({
  		message: error.message,
  	})
  }

}

module.exports = {
  getAllUrunAgacilari,
  getUrunAgaci,
  createUrunAgaci,
  updateUrunAgaci,
  deleteUrunAgaci
}