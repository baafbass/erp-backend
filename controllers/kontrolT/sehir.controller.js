const {
    getAllSehirFromDB,
    getSehirFromDB,
    createSehirFromDB,
    updateSehirFromDB,
    deleteSehirFromDB
} = require('../../repositories/kontrolT/sehir.repository')

const getAllSehir = async (req, res) => {
    try {
        const sehirler = await getAllSehirFromDB();
        res.status(200).json({
            status:'OK',
            sehirler
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSehir = async (req, res) => {
    const {sehir_kodu,firma_kodu} = req.params;
    try {
        const sehir = await getSehirFromDB(sehir_kodu,firma_kodu);
        if (!sehir) {
            return res.status(404).json({ message: 'sehir not found' });
        }
        res.status(200).json({
            status:"OK",
            sehir
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createSehir = async (req, res) => {
    const { firma_kodu,sehir_kodu,sehir_adi,ulke_kodu } = req.body;
    try {
        await createSehirFromDB(firma_kodu,sehir_kodu,sehir_adi,ulke_kodu);
        res.status(201).json({ 
            status:"OK",
            message: 'Sehir created successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSehir = async (req, res) => {
    const {firma_kodu,sehir_kodu,sehir_adi,ulke_kodu } = req.body;
    try {
        const updatedSehir = await updateSehirFromDB(firma_kodu,sehir_kodu,sehir_adi,ulke_kodu);
        if (updatedSehir === 0) {
            return res.status(404).json({ message: 'Sehir not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Sehir updated successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSehir = async (req, res) => {
    const {sehir_kodu,firma_kodu} = req.params;
    try {
        const deletedSehir = await deleteSehirFromDB(sehir_kodu,firma_kodu);
        if (deletedSehir === 0) {
            return res.status(404).json({ message: 'Sehir not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Sehir deleted successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllSehir,
    getSehir,
    createSehir,
    updateSehir,
    deleteSehir,
};