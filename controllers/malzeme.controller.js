const {
    getAllMalzemeFromDB,
    getMalzemeByIdFromDB,
    createMalzemeFromDB,
    updateMalzemeFromDB,
    deleteMalzemeFromDB,
} = require('../repositories/malzeme.repository');

const getAllMalzeme = async (req, res) => {
    try {
        const malzeme = await getAllMalzemeFromDB();
        res.json(malzeme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMalzemeById = async (req, res) => {
    try {
        const malzeme = await getMalzemeByIdFromDB(req.params.id);
        if (!malzeme) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        res.json(malzeme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMalzeme = async (req, res) => {
    const { ad, miktar, birim, firma_id } = req.body;
    try {
        await createMalzemeFromDB(ad, miktar, birim, firma_id);
        res.status(201).json({ message: 'Malzeme created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMalzeme = async (req, res) => {
    const { ad, miktar, birim, firma_id } = req.body;
    try {
        const updatedRows = await updateMalzemeFromDB(req.params.id, ad, miktar, birim, firma_id);
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        res.json({ message: 'Malzeme updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMalzeme = async (req, res) => {
    try {
        const deletedRows = await deleteMalzemeFromDB(req.params.id);
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        res.json({ message: 'Malzeme deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMalzeme,
    getMalzemeById,
    createMalzeme,
    updateMalzeme,
    deleteMalzeme,
};
