const {
    getAllUlkeFromDB,
    getUlkeFromDB,
    createUlkeFromDB,
    updateUlkeFromDB,
    deleteUlkeFromDB
} = require('../../repositories/kontrolT/ulke.repository')

const getAllUlke = async (req, res) => {
    try {
        const ulkeler = await getAllUlkeFromDB();
        res.status(200).json({
            status:'OK',
            ulkeler
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUlke = async (req, res) => {
    try {
        const ulke = await getUlkeFromDB(req.params.id);
        if (!ulke) {
            return res.status(404).json({ message: 'ulke not found' });
        }
        res.json(ulke);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUlke = async (req, res) => {
    const { firma_kodu,ulke_kodu,ulke_adi } = req.body;
    try {
        await createUlkeFromDB(firma_kodu,ulke_kodu,ulke_adi);
        res.status(201).json({ message: 'Ulke created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUlke = async (req, res) => {
    const {firma_kodu,ulke_kodu,ulke_adi } = req.body;
    try {
        const updatedUlke = await updateUlkeFromDB(firma_kodu,ulke_kodu,ulke_adi);
        if (updatedUlke === 0) {
            return res.status(404).json({ message: 'Ulke not found' });
        }
        res.json({ message: 'Ulke updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUlke = async (req, res) => {
    try {
        const deletedUlke = await deleteUlkeFromDB(req.params.id);
        if (deletedUlke === 0) {
            return res.status(404).json({ message: 'Ulke not found' });
        }
        res.json({ message: 'Ulke deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUlke,
    getUlke,
    createUlke,
    updateUlke,
    deleteUlke,
};