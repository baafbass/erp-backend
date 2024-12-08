const {
    getAllMalzemeTextFromDB,
    getMalzemeTextFromDB,
    createMalzemeTextFromDB,
    updateMalzemeTextFromDB,
    deleteMalzemeTextFromDB
} = require('../../repositories/MalzemeBilgileri/malzemeText.repository')

const getAllMalzemeText = async (req,res) => {
    try{
        const malzemeTexts = await getAllMalzemeTextFromDB();
        res.status(200).json({
            status:"OK",
            malzemeTexts
        })
    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

const getMalzemeText = async (req, res) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu} = req.query;
    try {
        const malzemeText = await getMalzemeTextFromDB({firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu});
        if (!malzemeText) {
            return res.status(404).json({ message: 'Malzeme Text not found'});
        }
        res.json(malzemeText);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMalzemeText = async (req, res) => {
    const { 
        firma_kodu,
        malzeme_tipi,
        malzeme_kodu, 
        gecerlilik_bas,
        gecerlilik_bit,
        dil_kodu,
        mal_kisa_acik,
        mal_uzun_acik
         } = req.body;

    try {
        await createMalzemeTextFromDB(firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu,mal_kisa_acik,mal_uzun_acik);

        res.status(201).json({ message: 'Malzeme Text created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMalzemeText = async (req, res) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu,mal_kisa_acik,mal_uzun_acik } = req.body;
    try {
        const updatedMalzemeText = await updateMalzemeTextFromDB(firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu,mal_kisa_acik,mal_uzun_acik);
        if (updatedMalzemeText === 0) {
            return res.status(404).json({ message: 'Malzeme Text not found' });
        }
        res.json({ message: 'Malzeme Text updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMalzemeText = async (req, res) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu} = req.query;
    try {
        const deletedMalzemeText = await deleteMalzemeTextFromDB({firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu});
        if (deletedMalzemeText === 0) {
            return res.status(404).json({ message: 'Malzeme Text not found' });
        }
        res.json({ message: 'Malzeme Text deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMalzemeText,
    getMalzemeText,
    createMalzemeText,
    updateMalzemeText,
    deleteMalzemeText,
};