const {
    getAllUrunAgaciHeadFromDB,
    getUrunAgaciHeadFromDB,
    createUrunAgaciHeadFromDB,
    updateUrunAgaciHeadFromDB,
    deleteUrunAgaciHeadFromDB
} = require('../../repositories/UrunAgacilari/urunAgaciHead.repository')

const getAllUrunAgaciHead = async (req,res) => {
    try{
        const urunAgaciHeads = await getAllUrunAgaciHeadFromDB();
        res.status(200).json({
            status:"OK",
            urunAgaciHeads
        })
    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

const getUrunAgaciHead = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu} = req.query;
    try {
        const urunAgaciHead = await getUrunAgaciHeadDB({firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu});
        if (!urunAgaciHead) {
            return res.status(404).json({ message: 'Urun Agaci Head not found'});
        }
        res.status(200).json({
            status:"OK",
            urunAgaciHead
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUrunAgaciHead = async (req, res) => {
    const { 
        firma_kodu,
        maliyet_merk_tipi,
        maliyet_merk_kodu,
        gecerlilik_bas,
        gecerlilik_bit,
        malzeme_tipi,
        malzeme_kodu, 
        temel_miktar,
        silindi_mi,
        passif_mi,
        cizim_numarasi
         } = req.body;

    try {
        await createUrunAgaciHeadFromDB(firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu,temel_miktar,silindi_mi,passif_mi,cizim_numarasi);

        res.status(201).json({
            status:"OK", 
            message: 'Urun Agaci Head created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUrunAgaciHead = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu,temel_miktar,silindi_mi,passif_mi,cizim_numarasi} = req.body;
    try {
        const updatedUrunAgaciHead = await updateUrunAgaciHeadFromDB(firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu,temel_miktar,silindi_mi,passif_mi,cizim_numarasi);
        if (updatedUrunAgaciHead === 0) {
            return res.status(404).json({ message: 'Urun Agaci Content not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Urun Agaci Head updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUrunAgaciHead = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu} = req.query;
    try {
        const deletedUrunAgaciHead = await deleteUrunAgaciHeadFromDB({firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu});
        if (deletedUrunAgaciHead === 0) {
            return res.status(404).json({ message: 'Urun Agaci Head not found' });
        }
        res.json({ message: 'Urun Agaci Head deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUrunAgaciHead,
    getUrunAgaciHead,
    createUrunAgaciHead,
    updateUrunAgaciHead,
    deleteUrunAgaciHead,
};