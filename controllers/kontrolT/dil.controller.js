const {
    getDilFromDB,
    createDilFromDB,
    updateDilFromDB,
    deleteDilFromDB
} = require('../../repositories/kontrolT/dil.repository')


const getDil = async (req, res) => {
    try {
        const dil = await getDilFromDB(req.params.id);
        if (!dil) {
            return res.status(404).json({ message: 'dil not found' });
        }
        res.json(dil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createDil = async (req, res) => {
    const { firma_kodu, dil_kodu, dil_adi } = req.body;
    try {
        await createDilFromDB(firma_kodu, dil_kodu, dil_adi);
        res.status(201).json({ message: 'Dil created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDil = async (req, res) => {
    const {firma_kodu,dil_kodu, dil_adi } = req.body;
    try {
        const updatedDil = await updateDilFromDB(firma_kodu,dil_kodu, dil_adi);
        if (updatedDil === 0) {
            return res.status(404).json({ message: 'Dil not found' });
        }
        res.json({ message: 'Dil updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDil = async (req, res) => {
    try {
        const deletedDil = await deleteDilFromDB(req.params.id);
        if (deletedDil === 0) {
            return res.status(404).json({ message: 'Dil not found' });
        }
        res.json({ message: 'Dil deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDil,
    createDil,
    updateDil,
    deleteDil,
};