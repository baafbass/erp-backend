const {
    getMaliyetMerkeziFromDB,
    createMaliyetMerkeziFromDB,
    updateMaliyetMerkeziFromDB,
    deleteMaliyetMerkeziFromDB
} = require('../../repositories/kontrolT/maliyetMerkezi.repository')


const getMaliyetMerkezi = async (req, res) => {
    try {
        const maliyetMerkezi = await getMaliyetMerkeziFromDB(req.params.id);
        if (!maliyetMerkezi) {
            return res.status(404).json({ message: 'Maliyet Merkezi not found' });
        }
        res.json(maliyetMerkezi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMaliyetMerkezi = async (req, res) => {
    const { firma_kodu,maliyet_merkezi,maliyet_merkezi_aciklamasi,passif_mi } = req.body;
    try {
        await createMaliyetMerkeziFromDB(firma_kodu,maliyet_merkezi,maliyet_merkezi_aciklamasi,passif_mi);
        res.status(201).json({ message: 'Maliyet Merkezi created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMaliyetMerkezi = async (req, res) => {
    const {firma_kodu,maliyet_merkezi,maliyet_merkezi_aciklamasi,passif_mi } = req.body;
    try {
        const updatedMaliyetMerkezi = await updateMaliyetMerkeziFromDB(firma_kodu,maliyet_merkezi,maliyet_merkezi_aciklamasi,passif_mi);
        if (updatedMaliyetMerkezi === 0) {
            return res.status(404).json({ message: 'Maliyet Merkezi not found' });
        }
        res.json({ message: 'Maliyet Merkezi updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMaliyetMerkezi = async (req, res) => {
    try {
        const deletedMaliyetMerkezi = await deleteMaliyetMerkeziFromDB(req.params.id);
        if (deletedMaliyetMerkezi === 0) {
            return res.status(404).json({ message: 'Maliyet Merkezi not found' });
        }
        res.json({ message: 'Maliyet Merkezi deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMaliyetMerkezi,
    createMaliyetMerkezi,
    updateMaliyetMerkezi,
    deleteMaliyetMerkezi,
};