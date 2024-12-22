const {
	getAllMaliyetHead,
	getMaliyetHead,
	createMaliyetHead,
	updateMaliyetHead,
	deleteMaliyetHead
    } = require('./maliyetHead.controller');

const {
	getAllMaliyetText,
	getMaliyetText,
	createMaliyetText,
	updateMaliyetText,
	deleteMaliyetText
} = require('./maliyetText.controller');


const getAllMaliyetMerkezleri = async (req,res) => {
	try{
		const headMaliyetMerkezleri = await getAllMaliyetHead();
		const textMaliyetMerkezleri = await getAllMaliyetText();

		const maliyetMerkezleri = headMaliyetMerkezleri.map((maliyetHead)=>{
			const matchingText = textMaliyetMerkezleri.find((maliyetText)=>
                maliyetHead.COMCODE === maliyetText.COMCODE &&
                maliyetHead.CCMDOCTYPE === maliyetText.CCMDOCTYPE &&
                maliyetHead.CCMDOCNUM === maliyetText.CCMDOCNUM &&
                maliyetHead.CCMDOCFROM.getTime() === maliyetText.CCMDOCFROM.getTime() &&
                maliyetHead.CCMDOCUNTIL.getTime() === maliyetText.CCMDOCUNTIL.getTime()
				)

			if(matchingText){
				return {
					...maliyetHead,
					...matchingText,
					ISPASSIVE:maliyetHead.ISPASSIVE === 1 ? "Evet" : "Hayır",
          ISDELETED:maliyetHead.ISDELETED ===  1 ? "Evet" : "Hayır",
					CCMDOCFROM: maliyetHead.CCMDOCFROM.toISOString().split('T')[0],
          CCMDOCUNTIL: maliyetHead.CCMDOCUNTIL.toISOString().split('T')[0]
				}
			}
			return null
		}).filter((item)=> item !== null)
     
     res.status(200).json({
      status:"OK",
      maliyetMerkezleri
  })
	}catch(error){
		res.status(500).json({
			error:error.message,
		})
	}

}

const getMaliyetMerkezi = async (req,res) => {
	const {
  	firma_kodu,
  	maliyet_merk_tipi,
  	maliyet_merk_kodu,
  	gecer_bas,
  	gecer_bit,
  	dil_kodu
  } = req.params;

  const headKeys = {
  	firma_kodu,
  	maliyet_merk_tipi,
  	maliyet_merk_kodu,
  	gecer_bas,
  	gecer_bit
  }

  const textKeys = {
  	firma_kodu,
  	maliyet_merk_tipi,
  	maliyet_merk_kodu,
  	gecer_bas,
  	gecer_bit,
  	dil_kodu
  }

  try {
  	const maliyetHead = await getMaliyetHead(headKeys);
  	const maliyetText = await getMaliyetText(textKeys);

  	if(!maliyetHead || !maliyetText){
  		return res.status(404).json({
  			message:"Maliyet Merkezi Head or Text not found."
  		})
  	}

  	const maliyetMerkezi = {
  		...maliyetHead,
  		...maliyetText,
  	}

  	res.status(200).json({
  		status:"OK",
  		maliyetMerkezi
  	})

  } catch(error){
  	res.status(500).json({
  		message:error.message
  	})
  }

}

const createMaliyetMerkezi = async (req,res) => {
	const {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    ana_maliyet_merk_tipi,
    ana_maliyet_merk_kodu,
    silindi_mi,
    passif_mi,
    dil_kodu,
    maliyet_merk_kisa_aciklamasi,
    maliyet_merk_uzun_aciklamasi
	} = req.body

	if(
		!firma_kodu ||
		!maliyet_merk_tipi ||
		!maliyet_merk_kodu ||
		!gecerlilik_bas ||
		!gecerlilik_bit ||
		!dil_kodu){
		return res.status(400).json({
			message:'Invalid Inputs',
		})
	}

	const maliyet_merk_head = {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    ana_maliyet_merk_tipi,
    ana_maliyet_merk_kodu,
    silindi_mi,
    passif_mi,
	}

	const maliyet_merk_text = {
	firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu,
    maliyet_merk_kisa_aciklamasi,
    maliyet_merk_uzun_aciklamasi
	}

	try{
        await createMaliyetHead(maliyet_merk_head);
        await createMaliyetText(maliyet_merk_text);
        
        res.status(201).json({
        	status:"OK",
        	message:"Maliyet Merkezi created successfully"
        })
	} catch(error){
		res.status(500).json({
			message:error.message
		})
	}

}

const updateMaliyetMerkezi = async (req,res) => {
   const {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    ana_maliyet_merk_tipi,
    ana_maliyet_merk_kodu,
    silindi_mi,
    passif_mi,
    dil_kodu,
    maliyet_merk_kisa_aciklamasi,
    maliyet_merk_uzun_aciklamasi
	} = req.body

	if(
		!firma_kodu ||
		!maliyet_merk_tipi ||
		!maliyet_merk_kodu ||
		!gecerlilik_bas ||
		!gecerlilik_bit ||
		!dil_kodu){
		return res.status(400).json({
			message:'Invalid Inputs',
		})
	}

	const maliyet_merk_head = {
    firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    ana_maliyet_merk_tipi,
    ana_maliyet_merk_kodu,
    silindi_mi,
    passif_mi,
	}

	const maliyet_merk_text = {
	firma_kodu,
    maliyet_merk_tipi,
    maliyet_merk_kodu,
    gecerlilik_bas,
    gecerlilik_bit,
    dil_kodu,
    maliyet_merk_kisa_aciklamasi,
    maliyet_merk_uzun_aciklamasi
	}

	try{
      await updateMaliyetHead(maliyet_merk_head);
      await updateMaliyetText(maliyet_merk_text);
      
      res.status(200).json({
      	status:"OK",
      	message:"Maliyet Merkezi updated successfully"
      })

	} catch(error){
		res.status(500).json({
			message:error.message,
		})
	}
}

const deleteMaliyetMerkezi = async (req,res) => {
  const {
  	firma_kodu,
  	maliyet_merk_tipi,
  	maliyet_merk_kodu,
  	gecer_bas,
  	gecer_bit,
  	dil_kodu
  } = req.params;

  const headKeys = {
  	firma_kodu,
  	maliyet_merk_tipi,
  	maliyet_merk_kodu,
  	gecer_bas,
  	gecer_bit
  }

  const textKeys = {
  	firma_kodu,
  	maliyet_merk_tipi,
  	maliyet_merk_kodu,
  	gecer_bas,
  	gecer_bit,
  	dil_kodu
  }

  try{
  	const deletedMaliyetHead = await deleteMaliyetHead(headKeys);
  	const deletedMaliyetText = await deleteMaliyetText(textKeys);

  	if(deletedMaliyetHead === 0 || deletedMaliyetText === 0 ){
  		return res.status(404).json({
  			message:"Maliyet Head or Text was not found"
  		})
  	}

  	res.status(200).json({
  		status:"OK",
  		message:'Maliyet Merkezi deleted successfully'
  	})

  } catch(error){
  	res.status(500).json({
  		message: error.message,
  	})
  }
}

module.exports = {
	getAllMaliyetMerkezleri,
	getMaliyetMerkezi,
	createMaliyetMerkezi,
	updateMaliyetMerkezi,
	deleteMaliyetMerkezi
}