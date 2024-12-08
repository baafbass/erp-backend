const {
    getAllUrunAgaciContentFromDB,
    getUrunAgaciContentFromDB,
    createUrunAgaciContentFromDB,
    updateUrunAgaciContentFromDB,
    deleteUrunAgaciContentFromDB
} = require('../../repositories/UrunAgacilari/urunAgaciContent.repository')

const getAllUrunAgaciContent = async (req,res) => {
    try{
        const urunAgaciContents = await getAllUrunAgaciContentFromDB();
        res.status(200).json({
            status:"OK",
            urunAgaciContents
        })
    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

const getUrunAgaciContent = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu,icerik_numarasi} = req.query;
    try {
        const urunAgaciContent = await getUrunAgaciContentFromDB({firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu,icerik_numarasi});
        if (!urunAgaciContent) {
            return res.status(404).json({ message: 'Urun Agaci Content not found'});
        }
        res.status(200).json({
            status:"OK",
            urunAgaciContent
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUrunAgaciContent = async (req, res) => {
    const { 
        firma_kodu,
        maliyet_merk_tipi,
        maliyet_merk_kodu,
        gecerlilik_bas,
        gecerlilik_bit,
        malzeme_tipi,
        malzeme_kodu, 
        icerik_numarasi,
        bilesen_kodu,
        kalem_urun_agaci_tipi,
        kalem_urun_agaci_kodu,
        bilesen_miktari
         } = req.body;

    try {
        await createUrunAgaciContentFromDB(firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu,icerik_numarasi,bilesen_kodu,kalem_urun_agaci_tipi,kalem_urun_agaci_kodu,bilesen_miktari);

        res.status(201).json({
            status:"OK", 
            message: 'Malzeme Text created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUrunAgaciContent = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu,icerik_numarasi,bilesen_kodu,kalem_urun_agaci_tipi,kalem_urun_agaci_kodu,bilesen_miktari} = req.body;
    try {
        const updatedUrunAgaciContent = await updateUrunAgaciContentFromDB(firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu,icerik_numarasi,bilesen_kodu,kalem_urun_agaci_tipi,kalem_urun_agaci_kodu,bilesen_miktari);
        if (updatedUrunAgaciContent === 0) {
            return res.status(404).json({ message: 'Urun Agaci Content not found' });
        }
        res.status(200).json({ 
            status:"OK",
            message: 'Urun Agaci Content updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUrunAgaciContent = async (req, res) => {
    const {firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu,icerik_numarasi} = req.query;
    try {
        const deletedUrunAgaciContent = await deleteUrunAgaciContentFromDB({firma_kodu,maliyet_merk_tipi,maliyet_merk_kodu,gecerlilik_bas,gecerlilik_bit,malzeme_tipi,malzeme_kodu,icerik_numarasi });
        if (deletedUrunAgaciContent === 0) {
            return res.status(404).json({ message: 'Urun Agaci Content not found' });
        }
        res.json({ message: 'Urun Agaci Content deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUrunAgaciContent,
    getUrunAgaciContent,
    createUrunAgaciContent,
    updateUrunAgaciContent,
    deleteUrunAgaciContent,
};