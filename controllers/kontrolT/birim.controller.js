const {
    getAllBirimFromDB,
    getBirimFromDB,
    createBirimFromDB,
    updateBirimFromDB,
    deleteBirimFromDB
} = require('../../repositories/kontrolT/birim.repository')

const getAllBirim = async (req, res) => {
    try {
        const birimler = await getAllBirimFromDB();
        res.status(200).json({
            status:"OK",
            birimler,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBirim = async (req, res) => {
    try {
        const birim = await getBirimFromDB(req.params.id);
        if (!birim) {
            return res.status(404).json({ message: 'Birim not found' });
        }
        res.json(birim);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBirim = async (req, res) => {
    const { firma_kodu, birim_kodu, birim_adi, ana_agirlik_birimi, ana_birim_kodu } = req.body;
    try {
        await createBirimFromDB(firma_kodu, birim_kodu, birim_adi, ana_agirlik_birimi, ana_birim_kodu);
        res.status(201).json({ message: 'Birim created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBirim = async (req, res) => {
    const {firma_kodu,birim_kodu, birim_adi, ana_agirlik_birimi, ana_birim_kodu } = req.body;
    try {
        const updatedBirim = await updateBirimFromDB(firma_kodu,birim_kodu, birim_adi, ana_agirlik_birimi, ana_birim_kodu);
        if (updatedBirim === 0) {
            return res.status(404).json({ message: 'Birim not found' });
        }
        res.json({ message: 'Birim updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBirim = async (req, res) => {
    try {
        const deletedBirim = await deleteBirimFromDB(req.params.id);
        if (deletedBirim === 0) {
            return res.status(404).json({ message: 'Birim not found' });
        }
        res.json({ message: 'Birim deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBirim,
    getBirim,
    createBirim,
    updateBirim,
    deleteBirim,
};