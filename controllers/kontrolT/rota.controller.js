const {
    getAllRotaFromDB,
    getRotaFromDB,
    createRotaFromDB,
    updateRotaFromDB,
    deleteRotaFromDB
} = require('../../repositories/kontrolT/rota.repository')


const getAllRota = async (req, res) => {
    try {
        const rotalar = await getAllRotaFromDB();
        res.status(200).json({
            status:'OK',
            rotalar
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRota = async (req, res) => {
    try {
        const rota = await getRotaFromDB(req.params.id);
        if (!rota) {
            return res.status(404).json({ message: 'rota not found' });
        }
        res.json(rota);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createRota = async (req, res) => {
    const { firma_kodu,rota,rota_aciklamasi,passif_mi } = req.body;
    try {
        await createRotaFromDB(firma_kodu,rota,rota_aciklamasi,passif_mi);
        res.status(201).json({ message: 'Rota created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRota = async (req, res) => {
    const {firma_kodu,rota,rota_aciklamasi,passif_mi } = req.body;
    try {
        const updatedRota = await updateRotaFromDB(firma_kodu,rota,rota_aciklamasi,passif_mi);
        if (updatedRota === 0) {
            return res.status(404).json({ message: 'Rota not found' });
        }
        res.json({ message: 'Rota updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRota = async (req, res) => {
    try {
        const deletedRota = await deleteRotaFromDB(req.params.id);
        if (deletedRota === 0) {
            return res.status(404).json({ message: 'Rota not found' });
        }
        res.json({ message: 'Rota deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllRota,
    getRota,
    createRota,
    updateRota,
    deleteRota,
};