const {
    getAllIsMerkeziFromDB,
    getIsMerkeziFromDB,
    createIsMerkeziFromDB,
    updateIsMerkeziFromDB,
    deleteIsMerkeziFromDB
} = require('../../repositories/kontrolT/isMerkezi.repository')

const getAllIsMerkezi = async (req, res) => {
    try {
        const isMerkezleri = await getAllIsMerkeziFromDB();
        res.status(200).json({
            status:"OK",
            isMerkezleri,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getIsMerkezi = async (req, res) => {
    try {
        const isMerkezi = await getIsMerkeziFromDB(req.params.id);
        if (!isMerkezi) {
            return res.status(404).json({ message: 'Is Merkezi not found' });
        }
        res.json(isMerkezi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createIsMerkezi = async (req, res) => {
    const { firma_kodu,is_merkezi,is_merkezi_aciklamasi,passif_mi } = req.body;
    try {
        await createIsMerkeziFromDB(firma_kodu,is_merkezi,is_merkezi_aciklamasi,passif_mi);
        res.status(201).json({ message: 'Is Merkezi created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateIsMerkezi = async (req, res) => {
    const {firma_kodu,is_merkezi,is_merkezi_aciklamasi,passif_mi } = req.body;
    try {
        const updatedIsMerkezi = await updateIsMerkeziFromDB(firma_kodu,is_merkezi,is_merkezi_aciklamasi,passif_mi);
        if (updatedIsMerkezi === 0) {
            return res.status(404).json({ message: 'Is Merkezi not found' });
        }
        res.json({ message: 'Is Merkezi updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteIsMerkezi = async (req, res) => {
    try {
        const deletedIsMerkezi = await deleteIsMerkeziFromDB(req.params.id);
        if (deletedIsMerkezi === 0) {
            return res.status(404).json({ message: 'Is Merkezi not found' });
        }
        res.json({ message: 'Is Merkezi deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllIsMerkezi,
    getIsMerkezi,
    createIsMerkezi,
    updateIsMerkezi,
    deleteIsMerkezi,
};