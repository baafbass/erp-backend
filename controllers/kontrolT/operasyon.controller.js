const {
    getAllOperasyonFromDB,
    getOperasyonFromDB,
    createOperasyonFromDB,
    updateOperasyonFromDB,
    deleteOperasyonFromDB
} = require('../../repositories/kontrolT/operasyon.repository')

const getAllOperasyon = async (req, res) => {
    try {
        const operasyonlar = await getAllOperasyonFromDB();
        res.status(200).json({
            status:'OK',
            operasyonlar
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOperasyon = async (req, res) => {
    try {
        const operasyon = await getOperasyonFromDB(req.params.id);
        if (!operasyon) {
            return res.status(404).json({ message: 'operasyon not found' });
        }
        res.json(operasyon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOperasyon = async (req, res) => {
    const { firma_kodu,operasyon,operasyon_aciklamasi,passif_mi } = req.body;
    try {
        await createOperasyonFromDB(firma_kodu,operasyon,operasyon_aciklamasi,passif_mi);
        res.status(201).json({ message: 'Operasyon created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOperasyon = async (req, res) => {
    const {firma_kodu,operasyon,operasyon_aciklamasi,passif_mi } = req.body;
    try {
        const updatedOperasyon = await updateOperasyonFromDB(firma_kodu,operasyon,operasyon_aciklamasi,passif_mi);
        if (updatedOperasyon === 0) {
            return res.status(404).json({ message: 'Operasyon not found' });
        }
        res.json({ message: 'Operasyon updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOperasyon = async (req, res) => {
    try {
        const deletedOperasyon = await deleteOperasyonFromDB(req.params.id);
        if (deletedOperasyon === 0) {
            return res.status(404).json({ message: 'Operasyon not found' });
        }
        res.json({ message: 'Operasyon deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllOperasyon,
    getOperasyon,
    createOperasyon,
    updateOperasyon,
    deleteOperasyon,
};