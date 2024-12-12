const {
    getAllOperasyonFromDB,
    getOperasyonFromDB,
    createOperasyonFromDB,
    updateOperasyonFromDB,
    deleteOperasyonFromDB
} = require('../../repositories/kontrolT/operasyon.repository')

const getAllOperasyon = async (req, res) => {
    try {
        const operasyonlar = await getAllOperasyonFromDB();
        res.status(200).json({
            status:'OK',
            operasyonlar
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOperasyon = async (req, res) => {
    const {operasyon_tipi,firma_kodu} = req.params;
    try {
        const operasyon = await getOperasyonFromDB(operasyon_tipi,firma_kodu);
        if (!operasyon) {
            return res.status(404).json({ message: 'operasyon not found' });
        }
       
        const transformedOperasyon = {
            ...operasyon,
            ISPASSIVE:operasyon.ISPASSIVE === "Evet" ? "1":"0"
        }

        res.status(200).json({
            status:"OK",
            transformedOperasyon
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOperasyon = async (req, res) => {
    const { firma_kodu,operasyon,operasyon_aciklamasi,passif_mi } = req.body;
    if(!firma_kodu || !operasyon || ! operasyon_aciklamasi){
        return res.status(400).json({
            message:'Invalid Inputs',
        })
    }
    try {
        await createOperasyonFromDB(firma_kodu,operasyon,operasyon_aciklamasi,passif_mi);
        res.status(201).json({ 
            status:"OK",
            message: 'Operasyon created successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOperasyon = async (req, res) => {
    const {firma_kodu,operasyon,operasyon_aciklamasi,passif_mi } = req.body;
    if(!operasyon_aciklamasi){
        return res.status(400).json({
            message:'Invalid Inputs',
        })
    }
    try {
        const updatedOperasyon = await updateOperasyonFromDB(firma_kodu,operasyon,operasyon_aciklamasi,passif_mi);
        if (updatedOperasyon === 0) {
            return res.status(404).json({ message: 'Operasyon not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Operasyon updated successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOperasyon = async (req, res) => {
    const {operasyon_tipi,firma_kodu} = req.params;
    try {
        const deletedOperasyon = await deleteOperasyonFromDB(operasyon_tipi,firma_kodu);
        if (deletedOperasyon === 0) {
            return res.status(404).json({ message: 'Operasyon not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Operasyon deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllOperasyon,
    getOperasyon,
    createOperasyon,
    updateOperasyon,
    deleteOperasyon,
};