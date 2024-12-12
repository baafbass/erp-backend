const {
    getAllMaliyetMerkeziFromDB,
    getMaliyetMerkeziFromDB,
    createMaliyetMerkeziFromDB,
    updateMaliyetMerkeziFromDB,
    deleteMaliyetMerkeziFromDB
} = require('../../repositories/kontrolT/maliyetMerkezi.repository')

const getAllMaliyetMerkezi = async (req, res) => {
    try {
        const maliyetMerkezleri = await getAllMaliyetMerkeziFromDB();
        res.status(200).json({
            status:"OK",
            maliyetMerkezleri,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMaliyetMerkezi = async (req, res) => {
    const {maliyet_merkezi,firma_kodu} = req.params;
    try {
        const maliyetMerkezi = await getMaliyetMerkeziFromDB(maliyet_merkezi,firma_kodu);
        if (!maliyetMerkezi) {
            return res.status(404).json({ message: 'Maliyet Merkezi not found' });
        }
        const transformedMaliyetMerkezi = {
            ...maliyetMerkezi,
            ISPASSIVE: maliyetMerkezi.ISPASSIVE === "Evet" ? "1":"0"
        }

        res.status(200).json({
            status:"OK",
            transformedMaliyetMerkezi
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMaliyetMerkezi = async (req, res) => {
    const { firma_kodu,maliyet_merkezi,maliyet_merkezi_aciklamasi,passif_mi } = req.body;
    if(!firma_kodu || !maliyet_merkezi || !maliyet_merkezi_aciklamasi){
        return res.status(400).json({
            message:'Invalid Inputs',
        })
    }
    try {
        await createMaliyetMerkeziFromDB(firma_kodu,maliyet_merkezi,maliyet_merkezi_aciklamasi,passif_mi);
        res.status(201).json({ 
            status:"OK",
            message: 'Maliyet Merkezi created successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMaliyetMerkezi = async (req, res) => {
    const {firma_kodu,maliyet_merkezi,maliyet_merkezi_aciklamasi,passif_mi } = req.body;
    if(!maliyet_merkezi_aciklamasi){
        return res.status(400).json({
            message:'Invalid Inputs',
        })
    }
    try {
        const updatedMaliyetMerkezi = await updateMaliyetMerkeziFromDB(firma_kodu,maliyet_merkezi,maliyet_merkezi_aciklamasi,passif_mi);
        if (updatedMaliyetMerkezi === 0) {
            return res.status(404).json({ message: 'Maliyet Merkezi not found' });
        }
        res.status(200).json({
            status:"OK", 
            message: 'Maliyet Merkezi updated successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMaliyetMerkezi = async (req, res) => {
    const {maliyet_merkezi,firma_kodu} = req.params;
    try {
        const deletedMaliyetMerkezi = await deleteMaliyetMerkeziFromDB(maliyet_merkezi,firma_kodu);
        if (deletedMaliyetMerkezi === 0) {
            return res.status(404).json({ message: 'Maliyet Merkezi not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Maliyet Merkezi deleted successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMaliyetMerkezi,
    getMaliyetMerkezi,
    createMaliyetMerkezi,
    updateMaliyetMerkezi,
    deleteMaliyetMerkezi,
};