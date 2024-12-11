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
        console.log('ismerkezi',isMerkezleri)
        res.status(200).json({
            status:"OK",
            isMerkezleri,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getIsMerkezi = async (req, res) => {
    const {is_merkezi,firma_kodu} = req.params;
    try {
        const isMerkezi = await getIsMerkeziFromDB(is_merkezi,firma_kodu);
        if (!isMerkezi) {
            return res.status(404).json({ message: 'Is Merkezi not found' });
        }

        const transformedIsMerkezi = {
            ...isMerkezi,
            ISPASSIVE: isMerkezi.ISPASSIVE === "Evet" ? "1":"0"
        }
        res.status(200).json({
            status:"OK",
            transformedIsMerkezi
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createIsMerkezi = async (req, res) => {
    const { firma_kodu,is_merkezi,is_merkezi_aciklamasi,passif_mi } = req.body;

    if(!firma_kodu || !is_merkezi || !is_merkezi_aciklamasi){
        return res.status(400).json({
            message:'Invalid Inputs',
        })
    }

    try {
        await createIsMerkeziFromDB(firma_kodu,is_merkezi,is_merkezi_aciklamasi,passif_mi);
        res.status(201).json({ 
            status:"OK",
            message: 'Is Merkezi created successfully'
             });
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
        res.json({ 
            status:"OK",
            message: 'Is Merkezi updated successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteIsMerkezi = async (req, res) => {
    const {is_merkezi,firma_kodu} = req.params;
    try {
        const deletedIsMerkezi = await deleteIsMerkeziFromDB(is_merkezi,firma_kodu);
        if (deletedIsMerkezi === 0) {
            return res.status(404).json({ message: 'Is Merkezi not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Is Merkezi deleted successfully' 
        });
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