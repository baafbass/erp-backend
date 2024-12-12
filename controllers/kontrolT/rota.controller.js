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
    const {rota_tipi,firma_kodu} = req.params;
    try {
        const rota = await getRotaFromDB(rota_tipi,firma_kodu);
        if (!rota) {
            return res.status(404).json({ message: 'rota not found' });
        }
        const transformedRota = {
            ...rota,
            ISPASSIVE:rota.ISPASSIVE === "Evet" ? "1":"0"
        }
        res.status(200).json({
            status:"OK",
            transformedRota
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createRota = async (req, res) => {
    const { firma_kodu,rota,rota_aciklamasi,passif_mi } = req.body;
    try {
        await createRotaFromDB(firma_kodu,rota,rota_aciklamasi,passif_mi);
        res.status(201).json({ 
            status:"OK",
            message: 'Rota created successfully'
             });
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
        res.status(200).json({ 
            status:"OK",
            message: 'Rota updated successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRota = async (req, res) => {
    const {rota_tipi,firma_kodu} = req.params;
    try {
        const deletedRota = await deleteRotaFromDB(rota_tipi,firma_kodu);
        if (deletedRota === 0) {
            return res.status(404).json({ message: 'Rota not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Rota deleted successfully'
             });
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