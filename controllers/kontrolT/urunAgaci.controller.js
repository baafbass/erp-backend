const {
    getUrunAgaciFromDB,
    createUrunAgaciFromDB,
    updateUrunAgaciFromDB,
    deleteUrunAgaciFromDB
} = require('../../repositories/kontrolT/urunAgaci.repository')


const getUrunAgaci = async (req, res) => {
    try {
        const urunAgaci = await getUrunAgaciFromDB(req.params.id);
        if (!urunAgaci) {
            return res.status(404).json({ message: 'Urun Agaci not found' });
        }
        res.json(urunAgaci);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUrunAgaci = async (req, res) => {
    const { firma_kodu,urun_agaci,urun_agaci_aciklama,passif_mi } = req.body;
    try {
        await createUrunAgaciFromDB(firma_kodu,urun_agaci,urun_agaci_aciklama,passif_mi);
        res.status(201).json({ message: 'Urun Agaci created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUrunAgaci = async (req, res) => {
    const {firma_kodu,urun_agaci,urun_agaci_aciklama,passif_mi } = req.body;
    try {
        const updatedUrunAgaci = await updateUrunAgaciFromDB(firma_kodu,urun_agaci,urun_agaci_aciklama,passif_mi);
        if (updatedUrunAgaci === 0) {
            return res.status(404).json({ message: 'Urun Agaci not found' });
        }
        res.json({ message: 'Urun Agaci updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUrunAgaci = async (req, res) => {
    try {
        const deletedUrunAgaci = await deleteUrunAgaciFromDB(req.params.id);
        if (deletedUrunAgaci === 0) {
            return res.status(404).json({ message: 'Urun Agaci not found' });
        }
        res.json({ message: 'Urun Agaci deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUrunAgaci,
    createUrunAgaci,
    updateUrunAgaci,
    deleteUrunAgaci,
};