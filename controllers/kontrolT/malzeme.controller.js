const {
    getAllMalzemeFromDB,
    getMalzemeFromDB,
    createMalzemeFromDB,
    updateMalzemeFromDB,
    deleteMalzemeFromDB,
} = require('../../repositories/kontrolT/malzeme.repository');

const getAllMalzeme = async (req, res) => {
    try {
        const malzemeler = await getAllMalzemeFromDB();
        res.status(200).json({
            status:'OK',
            malzemeler
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMalzeme = async (req, res) => {
    try {
        const malzeme = await getMalzemeFromDB(req.params.id);
        if (!malzeme) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        res.json(malzeme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMalzeme = async (req, res) => {
    const { firma_kodu, malzeme, malzeme_aciklamasi, passif_mi } = req.body;
    try {
        await createMalzemeFromDB(firma_kodu, malzeme, malzeme_aciklamasi, passif_mi);
        res.status(201).json({ message: 'Malzeme created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMalzeme = async (req, res) => {
    const { firma_kodu, malzeme, malzeme_aciklamasi, passif_mi } = req.body;
    try {
        const updatedMalzeme = await updateMalzemeFromDB(firma_kodu, malzeme, malzeme_aciklamasi, passif_mi);
        if (updatedMalzeme === 0) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        res.json({ message: 'Malzeme updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMalzeme = async (req, res) => {
    try {
        const deletedMalzeme = await deleteMalzemeFromDB(req.params.id);
        if (deletedMalzeme === 0) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        res.json({ message: 'Malzeme deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMalzeme,
    getMalzeme,
    createMalzeme,
    updateMalzeme,
    deleteMalzeme,
};
