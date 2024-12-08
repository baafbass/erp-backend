const {
    getAllMaliyetHeadFromDB,
    getMaliyetHeadFromDB,
    createMaliyetHeadFromDB,
    updateMaliyetHeadFromDB,
    deleteMaliyetHeadFromDB
} = require('../../repositories/MaliyetMerkezleri/maliyetHead.repository')

const getAllMaliyetHead = async (req,res) => {
    try{
        const maliyetHeads = await getAllMaliyetHeadFromDB();
        res.status(200).json({
            status:"OK",
            maliyetHeads
        })
    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

const getMaliyetHead = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit} = req.query;
    try {
        const maliyetHead = await getMaliyetHeadFromDB({firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit});
        if (!maliyetHead) {
            return res.status(404).json({ message: 'Maliyet Head not found'});
        }
        res.status(200).json({
            status:"OK",
            maliyetHead
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMaliyetHead = async (req, res) => {
    const { 
        firma_kodu,
        maliyet_merk_tipi,
        maliyet_merk_kodu, 
        gecerlilik_bas,
        gecerlilik_bit,
        ana_maliyet_merk_tipi,
        ana_maliyet_merk_kodu,
        silindi_mi,
        passif_mi
         } = req.body;

    try {
        await createMaliyetHeadFromDB(firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,ana_maliyet_merk_tipi,ana_maliyet_merk_kodu,silindi_mi,passif_mi);

        res.status(201).json({
            status:"OK", 
            message: 'Maliyet Head created successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMaliyetHead = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,ana_maliyet_merk_tipi,ana_maliyet_merk_kodu,silindi_mi,passif_mi } = req.body;
    try {
        const updatedMaliyetHead = await updateMaliyetHeadFromDB(firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,ana_maliyet_merk_tipi,ana_maliyet_merk_kodu,silindi_mi,passif_mi);
        if (updatedMaliyetHead === 0) {
            return res.status(404).json({ message: 'Maliyet Head not found' });
        }
        res.status(200).json({
            status:"OK", 
            message: 'Maliyet Head updated successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMaliyetHead = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit} = req.query;
    try {
        const deletedMaliyetHead = await deleteMaliyetHeadFromDB({firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit});
        if (deletedMaliyetHead === 0) {
            return res.status(404).json({ message: 'Maliyet Head not found' });
        }
        res.status(200).json({
            status:"OK", 
            message: 'Maliyet Head deleted successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMaliyetHead,
    getMaliyetHead,
    createMaliyetHead,
    updateMaliyetHead,
    deleteMaliyetHead,
};