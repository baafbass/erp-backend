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
        
        const transformedBirimler  = birimler.map((birim)=>({
            ...birim,
            ISMAINUNIT: birim.ISMAINUNIT === 1 ? "Evet": "Hayir",
        }))

        res.status(200).json({
            status:"OK",
            transformedBirimler,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBirim = async (req, res) => {
    const {birim_kodu,firma_kodu} = req.params;
    try {
        const birim = await getBirimFromDB(birim_kodu,firma_kodu);
        if (!birim) {
            return res.status(404).json({ message: 'Birim not found' });
        }
       
        const transformedBirim = {
            ...birim,
            ISMAINUNIT: birim.ISMAINUNIT === 1 ? "1":"0"
        }

        res.status(200).json({
            status:"OK",
            transformedBirim
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBirim = async (req, res) => {
    const { firma_kodu, birim_kodu, birim_adi, ana_agirlik_birimi, ana_birim_kodu } = req.body;
    if(!firma_kodu || !birim_kodu || !birim_adi){
        return res.status(400).json({
        message:'Invalid Inputs',
        })
    }
    try {
        await createBirimFromDB(firma_kodu, birim_kodu, birim_adi, ana_agirlik_birimi, ana_birim_kodu);
        res.status(201).json({
            status:"OK", 
            message: 'Birim created successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBirim = async (req, res) => {
    const {firma_kodu,birim_kodu, birim_adi, ana_agirlik_birimi, ana_birim_kodu } = req.body;
    if(!birim_adi){
        return res.status(400).json({
            message:'Invalid Inputs'
        })
    }
    try {
        const updatedBirim = await updateBirimFromDB(firma_kodu,birim_kodu, birim_adi, ana_agirlik_birimi, ana_birim_kodu);
        if (updatedBirim === 0) {
            return res.status(404).json({ message: 'Birim not found' });
        }
        res.status(200).json({
            status:"OK", 
            message: 'Birim updated successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBirim = async (req, res) => {
    const {birim_kodu,firma_kodu} = req.params;
    try {
        const deletedBirim = await deleteBirimFromDB(birim_kodu,firma_kodu);
        if (deletedBirim === 0) {
            return res.status(404).json({ message: 'Birim not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Birim deleted successfully' 
        });
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