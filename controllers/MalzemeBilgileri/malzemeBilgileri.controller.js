const {
	createMalzemeHead,
	updateMalzemeHead,
	deleteMalzemeHead,
	getMalzemeHead,
	getAllMalzemeHead
} = require('./malzemeHead.controller');

const {
	createMalzemeText,
	updateMalzemeText,
	deleteMalzemeText,
	getMalzemeText,
	getAllMalzemeText
} = require('./malzemeText.controller');


const getAllMalzemeBilgileri = async (req, res) => {
    try {
        const allHeadMalzeme = await getAllMalzemeHead();
        const allTextMalzeme = await getAllMalzemeText();

        const allMalzemeBilgileri = allHeadMalzeme.map((malzemeHead) => {
            const matchingText = allTextMalzeme.find((malzemeText) =>
                malzemeHead.COMCODE === malzemeText.COMCODE &&
                malzemeHead.MATDOCTYPE === malzemeText.MATDOCTYPE &&
                malzemeHead.MATDOCNUM === malzemeText.MATDOCNUM &&
                malzemeHead.MATDOCFROM.getTime() === malzemeText.MATDOCFROM.getTime() &&
                malzemeHead.MATDOCUNTIL.getTime() === malzemeText.MATDOCUNTIL.getTime()
            );

            if (matchingText) {
                return {
                    ...malzemeHead,
                    ...matchingText,
                    ISPASSIVE:malzemeHead.ISPASSIVE === 1 ? "Evet" : "Hayır",
                    ISDELETED:malzemeHead.ISDELETED ===  1 ? "Evet" : "Hayır",
                    SUPPLYTYPE: malzemeHead.SUPPLYTYPE === 1 ? "Üretilen" : "Satınalınan",
                    MATDOCFROM: malzemeHead.MATDOCFROM.toISOString().split('T')[0],
                    MATDOCUNTIL: malzemeHead.MATDOCUNTIL.toISOString().split('T')[0]
                };
            }
            return null;
        }).filter((item) => item !== null);

        res.status(200).json({
            status: "OK",
            allMalzemeBilgileri
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const getMalzemeBilgileri = async (req,res) => {

	const {
	firma_kodu,
	malzeme_tipi,
	malzeme_kodu,
    gecer_bas,
    gecer_bit,
    dil_kodu
	} = req.params;
	
	const headKeys = {
	firma_kodu,
	malzeme_tipi,
	malzeme_kodu,
    gecer_bas,
    gecer_bit
	}

	const textKeys = {
	firma_kodu,
	malzeme_tipi,
	malzeme_kodu,
    gecer_bas,
    gecer_bit,
    dil_kodu
	}

	try{
		const malzemeHead = await getMalzemeHead(headKeys)
		const malzemeText = await getMalzemeText(textKeys);
    
    if(!malzemeHead || !malzemeText){
    	return res.status(404).json({
    		message:"Malzeme Head or Text not found",
    	})
    }

    const malzemeBilgileri = {
				...malzemeHead,
				...malzemeText
			}

		res.status(200).json({
			status:"OK",
          malzemeBilgileri
		})
     
	} catch(error) {
		res.status(500).json({
        error:error.message,
		})
	}
}

const createMalzemeBilgileri = async (req,res) => {
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
		rota_tipi,
		rota_numarasi,
		silindi_mi,
		passif_mi,
		dil_kodu,
		malzeme_kisa_aciklamasi,
		malzeme_uzun_aciklamasi
	} = req.body;
    
	if( !firma_kodu || 
		!malzeme_tipi || 
		!malzeme_kodu || 
		!gecerlilik_bas || 
		!gecerlilik_bit || 
		!tedarik_tipi || 
		!malzeme_stok_birimi || 
		!dil_kodu || 
		!malzeme_kisa_aciklamasi || 
		!malzeme_uzun_aciklamasi){
		
		return res.status(400).json({
			message:'Invalid Inputs',
		})
	}
    
    const malzemeHeadBilgileri = {
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
		rota_tipi,
		rota_numarasi,
		silindi_mi,
		passif_mi}

		const malzemeTextBilgileri = {
        firma_kodu,
		malzeme_tipi,
		malzeme_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		dil_kodu,
		malzeme_kisa_aciklamasi,
		malzeme_uzun_aciklamasi
    }

    try {
     await createMalzemeHead(malzemeHeadBilgileri);
     await createMalzemeText(malzemeTextBilgileri);

    res.status(201).json({
    	status:"OK",
    	message:"Malzeme Bilgileri created successfully"
    })

    } catch(error){
    	res.status(500).json({
    		message:error.message || "internal error"
    	})
    } 
}

const updateMalzemeBilgileri =  async (req,res) => {
  
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
		rota_tipi,
		rota_numarasi,
		silindi_mi,
		passif_mi,
		dil_kodu,
		malzeme_kisa_aciklamasi,
		malzeme_uzun_aciklamasi
	} = req.body;

	if( !firma_kodu || 
		!malzeme_tipi || 
		!malzeme_kodu || 
		!gecerlilik_bas || 
		!gecerlilik_bit || 
		!malzeme_stok_birimi || 
		!dil_kodu || 
		!malzeme_kisa_aciklamasi || 
		!malzeme_uzun_aciklamasi){
		
		return res.status(400).json({
			message:'Invalid Inputs',
		})
	}
    
    const malzemeHeadBilgileri = {
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
		rota_tipi,
		rota_numarasi,
		silindi_mi,
		passif_mi}

		const malzemeTextBilgileri = {
    firma_kodu,
		malzeme_tipi,
		malzeme_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		dil_kodu,
		malzeme_kisa_aciklamasi,
		malzeme_uzun_aciklamasi
    }

	try{
    await updateMalzemeHead(malzemeHeadBilgileri);
    await updateMalzemeText(malzemeTextBilgileri);
    
    return res.status(200).json({
    	status:"OK",
    	message:"Malzeme Bilgileri updated successfully"
    })
	} catch(error) {
		res.status(500).json({
        error:error.message || "internal error",
		})
	}
}

const deleteMalzemeBilgileri = async (req,res) => {
	
	const {
		firma_kodu,
		malzeme_tipi,
		malzeme_kodu,
    gecer_bas,
    gecer_bit,
    dil_kodu
	} = req.params;
	
	const headKeys = {
		firma_kodu,
		malzeme_tipi,
		malzeme_kodu,
    gecer_bas,
    gecer_bit
	}

	const textKeys = {
		firma_kodu,
		malzeme_tipi,
		malzeme_kodu,
    gecer_bas,
    gecer_bit,
    dil_kodu
	}

	try{
    const deletedMalzemeHead = await deleteMalzemeHead(headKeys);
    const deletedMalzemeText = await deleteMalzemeText(textKeys);

    if (deletedMalzemeHead === 0 || deletedMalzemeText === 0) {
    	return res.status(404).json({
    		message:"Malzeme Head or Text not found",
    	})
    }

    res.status(200).json({
    	status:"OK",
    	message:"Malzeme deleted successfully"
    })
	} catch(error) {
		res.status(500).json({
        error:error.message,
		})
	}}


module.exports = {
	getAllMalzemeBilgileri,
	getMalzemeBilgileri,
	createMalzemeBilgileri,
	updateMalzemeBilgileri,
	deleteMalzemeBilgileri
}