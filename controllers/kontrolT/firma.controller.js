const {
    getAllFirmaFromDB,
    getFirmaFromDB,
    createFirmaFromDB,
    updateFirmaFromDB,
    deleteFirmaFromDB
} = require('../../repositories/kontrolT/firma.repository')


const getAllFirma = async (req, res) => {
    try {
        const firmalar = await getAllFirmaFromDB();
        res.status(200).json({
            status:"OK",
            firmalar,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFirma = async (req, res) => {
    const {firma_kodu} = req.params;
    try {
        const firma = await getFirmaFromDB(firma_kodu);
        if (!firma) {
            return res.status(404).json({ message: 'firma not found' });
        }
        res.status(200).json({
            status:"OK",
            firma
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createFirma = async (req, res) => {
    const { firma_kodu,firma_adi,firma_adresi_1,firma_adresi_2,sehir_kodu,ulke_kodu } = req.body;
    try {
        await createFirmaFromDB(firma_kodu,firma_adi,firma_adresi_1,firma_adresi_2,sehir_kodu,ulke_kodu);
        res.status(201).json({
            status: 'OK', 
            message: 'Firma created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateFirma = async (req, res) => {
    const {firma_kodu,firma_adi,firma_adresi_1,firma_adresi_2,sehir_kodu,ulke_kodu } = req.body;
    try {
        const updatedFirma = await updateFirmaFromDB(firma_kodu,firma_adi,firma_adresi_1,firma_adresi_2,sehir_kodu,ulke_kodu);
        if (updatedFirma === 0) {
            return res.status(404).json({ message: 'Firma not found' });
        }
        res.status(200).json({
            status: "OK", 
            message: 'Firma updated successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFirma = async (req, res) => {
    const {firma_kodu} = req.params;
    try {
        const deletedFirma = await deleteFirmaFromDB(firma_kodu);
        if (deletedFirma === 0) {
            return res.status(404).json({ message: 'Firma not found' });
        }
        res.status(200).json({
            status:"OK", 
            message: 'Firma deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllFirma,
    getFirma,
    createFirma,
    updateFirma,
    deleteFirma,
};