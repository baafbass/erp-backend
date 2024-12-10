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
    try {
        const sehir = await getSehirFromDB(req.params.id);
        if (!sehir) {
            return res.status(404).json({ message: 'sehir not found' });
        }
        res.json(sehir);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createSehir = async (req, res) => {
    const { firma_kodu,sehir_kodu,sehir_adi,ulke_kodu } = req.body;
    try {
        await createSehirFromDB(firma_kodu,sehir_kodu,sehir_adi,ulke_kodu);
        res.status(201).json({ message: 'Sehir created successfully' });
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
        res.json({ message: 'Sehir updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSehir = async (req, res) => {
    try {
        const deletedSehir = await deleteSehirFromDB(req.params.id);
        if (deletedSehir === 0) {
            return res.status(404).json({ message: 'Sehir not found' });
        }
        res.json({ message: 'Sehir deleted successfully' });
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