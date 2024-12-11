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
    const {malzeme_tipi,firma_kodu} = req.params;
    try {
        const malzeme = await getMalzemeFromDB(malzeme_tipi,firma_kodu);
        if (!malzeme) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        console.log('--->',malzeme);

        const transformedMalzeme = {
            ...malzeme,
            ISPASSIVE: malzeme.ISPASSIVE === "Evet" ? "1":"0"
        };

        res.status(200).json({
            status:"OK",
            transformedMalzeme
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMalzeme = async (req, res) => {
    const { firma_kodu, malzeme, malzeme_aciklamasi, passif_mi } = req.body;
    try {
        await createMalzemeFromDB(firma_kodu, malzeme, malzeme_aciklamasi, passif_mi);
        res.status(201).json({
            status:"OK", 
            message: 'Malzeme created successfully'
             });
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
        res.status(200).json({ 
            status:"OK",
            message: 'Malzeme updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMalzeme = async (req, res) => {
    const {malzeme_tipi,firma_kodu} = req.params;
    try {
        const deletedMalzeme = await deleteMalzemeFromDB(malzeme_tipi,firma_kodu);
        if (deletedMalzeme === 0) {
            return res.status(404).json({ message: 'Malzeme not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Malzeme deleted successfully'
             });
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
