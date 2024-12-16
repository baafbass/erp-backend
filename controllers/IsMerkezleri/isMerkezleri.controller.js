const {
	getAllIsMerkezlerHead,
	getIsMerkezHead,
	createIsMerkezHead,
	updateIsMerkezHead,
	deleteIsMerkezHead
} = require('./isMerkezHead.controller')

const {
	getAllIsMerkezlerText,
	getIsMerkezText,
	createIsMerkezText,
	updateIsMerkezText,
	deleteIsMerkezText
} = require('./isMerkezText.controller')

const {
	getAllIsMerkezlerOpr,
	getIsMerkezOpr,
	createIsMerkezOpr,
	updateIsMerkezOpr,
	deleteIsMerkezOpr
} = require('./isMerkezOpr.controller')


const getAllIsMerkezleri = async (req, res) => {
  try {
   
    const headIsMerkezleri = await getAllIsMerkezlerHead();
    const textIsMerkezleri = await getAllIsMerkezlerText();
    const oprIsMerkezleri = await getAllIsMerkezlerOpr();

    const isMerkezleri = headIsMerkezleri.map((isMerkezHead) => {
      const matchingText = textIsMerkezleri.find(
        (isMerkezText) =>
          isMerkezHead.COMCODE === isMerkezText.COMCODE &&
          isMerkezHead.WCMDOCTYPE === isMerkezText.WCMDOCTYPE &&
          isMerkezHead.WCMDOCNUM === isMerkezText.WCMDOCNUM &&
          isMerkezHead.WCMDOCFROM.getTime() === isMerkezText.WCMDOCFROM.getTime() &&
          isMerkezHead.WCMDOCUNTIL.getTime() === isMerkezText.WCMDOCUNTIL.getTime()
      );

      const matchingOpr = oprIsMerkezleri.find(
        (isMerkezOpr) =>
          isMerkezHead.COMCODE === isMerkezOpr.COMCODE &&
          isMerkezHead.WCMDOCTYPE === isMerkezOpr.WCMDOCTYPE &&
          isMerkezHead.WCMDOCNUM === isMerkezOpr.WCMDOCNUM &&
          isMerkezHead.WCMDOCFROM.getTime() === isMerkezOpr.WCMDOCFROM.getTime() &&
          isMerkezHead.WCMDOCUNTIL.getTime() === isMerkezOpr.WCMDOCUNTIL.getTime()
      );

      if (matchingText && matchingOpr) {
        return {
          ...isMerkezHead,
          ...matchingText,
          ...matchingOpr,
        };
      }
      return null;
    }).filter((item) => item !== null);

   
    res.status(200).json({
      status: "OK",
      isMerkezleri,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getIsMerkezi = async (req,res) => {
const {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit,
   	dil_kodu,
   	opr_kodu
   } = req.params;

   const headKeys = {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit
   }

   const textKeys = {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit,
   	dil_kodu
   }

   const oprKeys = {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit,
   	opr_kodu
   }

   try{
   	const isMerkezHead = await getIsMerkezHead(headKeys);
   	const isMerkezText = await getIsMerkezText(textKeys);
   	const isMerkezOpr = await getIsMerkezOpr(oprKeys);

   	if(!isMerkezHead || !isMerkezText || !isMerkezOpr){
   		return res.status(404).json({
   			message:'Is merkezi Head or Text or Operation not found',
   		})
   	}

   	const isMerkezi = {
   		...isMerkezHead,
   		...isMerkezText,
   		...isMerkezOpr
   	}

   	res.status(200).json({
   		status:"OK",
   		isMerkezi
   	})

   } catch(error){
   	res.status(500).json({
   		message:error.message,
   	})
   }
}

const createIsMerkezi = async (req,res) => {
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
		dil_kodu,
		is_merk_kisa_aciklamasi,
		is_merk_uzun_aciklamasi,
		opr_kodu
	} = req.body

	if(
		!firma_kodu ||
		!is_merk_tipi ||
		!is_merk_kodu ||
		!gecerlilik_bas ||
		!gecerlilik_bit ||
		!dil_kodu ||
		!opr_kodu){
		return res.status(400).json({
			message:'Invalid inputs',
		})
	}

	const is_merk_head = {
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
	}
   
   const is_merk_text = {
   		firma_kodu,
		is_merk_tipi,
		is_merk_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		dil_kodu,
		is_merk_kisa_aciklamasi,
		is_merk_uzun_aciklamasi,
   }

   const is_merk_opr = {
   	   	firma_kodu,
		is_merk_tipi,
		is_merk_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		opr_kodu
   } 

   try{
   	await createIsMerkezHead(is_merk_head);
   	await createIsMerkezText(is_merk_text);
   	await createIsMerkezOpr(is_merk_opr);

   	res.status(201).json({
   		status:"OK",
   		message:"Is Merkezi created successfully"
   	})

   } catch(error){
   	res.status(500).json({
   		message:error.message,
   	})
   }
}

const updateIsMerkezi =  async (req,res) => {
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
		dil_kodu,
		is_merk_kisa_aciklamasi,
		is_merk_uzun_aciklamasi,
		opr_kodu
	} = req.body

	if(
		!firma_kodu ||
		!is_merk_tipi ||
		!is_merk_kodu ||
		!gecerlilik_bas ||
		!gecerlilik_bit ||
		!dil_kodu ||
		!opr_kodu){
		return res.status(400).json({
			message:'Invalid inputs',
		})
	}

	const is_merk_head = {
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
	}
   
   const is_merk_text = {
   		firma_kodu,
		is_merk_tipi,
		is_merk_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		dil_kodu,
		is_merk_kisa_aciklamasi,
		is_merk_uzun_aciklamasi,
   }

   const is_merk_opr = {
   	   	firma_kodu,
		is_merk_tipi,
		is_merk_kodu,
		gecerlilik_bas,
		gecerlilik_bit,
		opr_kodu
   } 

   try{
   	await updateIsMerkezHead(is_merk_head);
   	await updateIsMerkezText(is_merk_text);
   	await updateIsMerkezOpr(is_merk_opr);

   	res.status(201).json({
   		status:"OK",
   		message:"Is Merkezi updated successfully"
   	})

   } catch(error){
   	res.status(500).json({
   		message:error.message,
   	})
   }
}

const deleteIsMerkezi = async (req,res) => {
   const {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit,
   	dil_kodu,
   	opr_kodu
   } = req.params;

   const headKeys = {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit
   }

   const textKeys = {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit,
   	dil_kodu
   }

   const oprKeys = {
   	firma_kodu,
   	is_merk_tipi,
   	is_merk_kodu,
   	gecer_bas,
   	gecer_bit,
   	opr_kodu
   }

   try{
   	const deletedIsMerkezHead = await deleteIsMerkezHead(headKeys);
   	const deletedIsMerkezText = await deleteIsMerkezText(textKeys);
   	const deletedIsMerkezOpr = await deleteIsMerkezOpr(oprKeys);

   	if(deleteIsMerkezHead === 0 || deleteIsMerkezText === 0 || deleteIsMerkezOpr === 0){
   		return res.status(404).json({
   			message:'Is Merkezi Head or Text or Operation not found.'
   		})
   	}

   	res.status(200).json({
   		status:'OK',
   		message:'Is Merkezi deleted successfully'
   	})

   } catch(error){
   	res.status(500).json({
   		message:error.message,
   	})
   }
}

module.exports = {
	getAllIsMerkezleri,
	getIsMerkezi,
	createIsMerkezi,
	updateIsMerkezi,
	deleteIsMerkezi
}

