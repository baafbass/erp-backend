const {
    getAllUlkeFromDB,
    getUlkeFromDB,
    createUlkeFromDB,
    updateUlkeFromDB,
    deleteUlkeFromDB
} = require('../../repositories/kontrolT/ulke.repository')

const getAllUlke = async (req, res) => {
    try {
        const ulkeler = await getAllUlkeFromDB();
        res.status(200).json({
            status:'OK',
            ulkeler
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUlke = async (req, res) => {
    const {ulke_kodu,firma_kodu} = req.params;
    try {
        const ulke = await getUlkeFromDB(ulke_kodu,firma_kodu);
        if (!ulke) {
            return res.status(404).json({ message: 'ulke not found' });
        }
        res.status(200).json({
            status:"OK",
            ulke
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUlke = async (req, res) => {
    const { firma_kodu,ulke_kodu,ulke_adi } = req.body;
    if(!firma_kodu || !ulke_kodu || !ulke_adi){
      return res.status(400).json({
        message:'Invalid Inputs',
      })
    }
    try {
        await createUlkeFromDB(firma_kodu,ulke_kodu,ulke_adi);
        res.status(201).json({ 
            status:"OK",
            message: 'Ulke created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUlke = async (req, res) => {
    const {firma_kodu,ulke_kodu,ulke_adi } = req.body;
    if(!ulke_adi){
        return res.status(400).json({
            message:'Invalid Inputs',
        })
    }
    try {
        const updatedUlke = await updateUlkeFromDB(firma_kodu,ulke_kodu,ulke_adi);
        if (updatedUlke === 0) {
            return res.status(404).json({ message: 'Ulke not found' });
        }
        res.status(200).json({
        status:"OK", 
        message: 'Ulke updated successfully' 
    });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUlke = async (req, res) => {
    const {ulke_kodu,firma_kodu} = req.params;
    try {
        const deletedUlke = await deleteUlkeFromDB(ulke_kodu,firma_kodu);
        if (deletedUlke === 0) {
            return res.status(404).json({ message: 'Ulke not found' });
        }
        res.json({
            status:"OK", 
            message: 'Ulke deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUlke,
    getUlke,
    createUlke,
    updateUlke,
    deleteUlke,
};