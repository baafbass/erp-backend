const {
    getFirmaFromDB,
    createFirmaFromDB,
    updateFirmaFromDB,
    deleteFirmaFromDB
} = require('../../repositories/kontrolT/firma.repository')


const getFirma = async (req, res) => {
    try {
        const firma = await getFirmaFromDB(req.params.id);
        if (!firma) {
            return res.status(404).json({ message: 'firma not found' });
        }
        res.json(firma);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createFirma = async (req, res) => {
    const { firma_kodu,firma_adi,firma_adresi_1,firma_adresi_2,sehir_kodu,ulke_kodu } = req.body;
    try {
        await createFirmaFromDB(firma_kodu,firma_adi,firma_adresi_1,firma_adresi_2,sehir_kodu,ulke_kodu);
        res.status(201).json({ message: 'Firma created successfully' });
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
        res.json({ message: 'Firma updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFirma = async (req, res) => {
    try {
        const deletedFirma = await deleteFirmaFromDB(req.params.id);
        if (deletedFirma === 0) {
            return res.status(404).json({ message: 'Firma not found' });
        }
        res.json({ message: 'Firma deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFirma,
    createFirma,
    updateFirma,
    deleteFirma,
};