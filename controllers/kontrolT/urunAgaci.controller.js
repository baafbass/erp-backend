const {
    getAllUrunAgaciFromDB,
    getUrunAgaciFromDB,
    createUrunAgaciFromDB,
    updateUrunAgaciFromDB,
    deleteUrunAgaciFromDB
} = require('../../repositories/kontrolT/urunAgaci.repository')

const getAllUrunAgaci = async (req, res) => {
    try {
        const urunAgacilari = await getAllUrunAgaciFromDB();
        console.log(urunAgacilari)
        res.status(200).json({
            status:'OK',
            urunAgacilari
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getUrunAgaci = async (req, res) => {
    const {urun_agaci_tipi,firma_kodu} = req.params;
    try {
        const urunAgaci = await getUrunAgaciFromDB(urun_agaci_tipi,firma_kodu);
        if (!urunAgaci) {
            return res.status(404).json({ message: 'Urun Agaci not found' });
        }

        const transformedUrunAgaci = {
            ...urunAgaci,
            ISPASSIVE:urunAgaci.ISPASSIVE === "Evet" ? "1":"0"
        }

        res.status(200).json({
            status:"OK",
            transformedUrunAgaci
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUrunAgaci = async (req, res) => {
    const { firma_kodu,urun_agaci,urun_agaci_aciklama,passif_mi } = req.body;
    console.log(firma_kodu,urun_agaci,urun_agaci_aciklama,passif_mi)
    try {
        await createUrunAgaciFromDB(firma_kodu,urun_agaci,urun_agaci_aciklama,passif_mi);
        res.status(201).json({ 
            status:"OK",
            message: 'Urun Agaci created successfully' });
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
        res.status(200).json({
            status:"OK", 
            message: 'Urun Agaci updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUrunAgaci = async (req, res) => {
    const {urun_agaci_tipi,firma_kodu} = req.params;
    try {
        const deletedUrunAgaci = await deleteUrunAgaciFromDB(urun_agaci_tipi,firma_kodu);
        if (deletedUrunAgaci === 0) {
            return res.status(404).json({ message: 'Urun Agaci not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Urun Agaci deleted successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUrunAgaci,
    getUrunAgaci,
    createUrunAgaci,
    updateUrunAgaci,
    deleteUrunAgaci,
};