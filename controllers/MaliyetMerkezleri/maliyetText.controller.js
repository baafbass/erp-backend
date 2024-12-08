const {
    getAllMaliyetTextFromDB,
    getMaliyetTextFromDB,
    createMaliyetTextFromDB,
    updateMaliyetTextFromDB,
    deleteMaliyetTextFromDB
} = require('../../repositories/MaliyetMerkezleri/maliyetText.repository')

const getAllMaliyetText = async (req,res) => {
    try{
        const maliyetTexts = await getAllMaliyetTextFromDB();
        res.status(200).json({
            status:"OK",
            maliyetTexts
        })
    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

const getMaliyetText = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu} = req.query;
    try {
        const maliyetText = await getMaliyetTextFromDB({firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu});
        if (!maliyetText) {
            return res.status(404).json({ message: 'Maliyet Text not found'});
        }
        res.status(200).json({
            status:"OK",
            maliyetText
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMaliyetText = async (req, res) => {
    const { 
        firma_kodu,
        maliyet_merk_tipi,
        maliyet_merk_kodu, 
        gecerlilik_bas,
        gecerlilik_bit,
        dil_kodu,
        maliyet_merk_kisa_acik,
        maliyet_merk_uzun_acik
         } = req.body;

    try {
        await createMaliyetTextFromDB(firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu,maliyet_merk_kisa_acik,maliyet_merk_uzun_acik);

        res.status(201).json({
            status:"OK", 
            message: 'Maliyet Text created successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMaliyetText = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu,maliyet_merk_kisa_acik,maliyet_merk_uzun_acik } = req.body;
    try {
        const updatedMaliyetText = await updateMaliyetTextFromDB(firma_kodu,maliyet_tipi,maliyet_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu,maliyet_merk_kisa_acik,maliyet_merk_uzun_acik);
        if (updatedMaliyetText === 0) {
            return res.status(404).json({ message: 'Maliyet Text not found' });
        }
        res.status(200).json({
            status:"OK", 
            message: 'Maliyet Text updated successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMaliyetText = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu} = req.query;
    try {
        const deletedMaliyetText = await deleteMaliyetTextFromDB({firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,dil_kodu});
        if (deletedMaliyetText === 0) {
            return res.status(404).json({ message: 'Maliyet Text not found' });
        }
        res.status(200).json({
            status:"OK", 
            message: 'Maliyet Text deleted successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMaliyetText,
    getMaliyetText,
    createMaliyetText,
    updateMaliyetText,
    deleteMaliyetText,
};