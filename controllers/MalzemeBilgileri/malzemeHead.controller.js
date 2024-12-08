const {
    getAllMalzemeHeadFromDB,
    getMalzemeHeadFromDB,
    createMalzemeHeadFromDB,
    updateMalzemeHeadFromDB,
    deleteMalzemeHeadFromDB
} = require('../../repositories/MalzemeBilgileri/malzemeHead.repository')

const getAllMalzemeHead = async () => {
    try{
        const malzemeHeads = await getAllMalzemeHeadFromDB()
        res.status(200).json({
            status:"OK",
            message:"Malzeme Heads Fetched successfully"
        })
    } catch(error) {
        res.status(500).json({
            error:error.message,
        })
    }
}

const getMalzemeHead = async (req, res) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit} = req.query;
    try {
        const malzemeHead = await getMalzemeHeadFromDB({firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit});
        if (!malzemeHead) {
            return res.status(404).json({ message: 'Malzeme Head not found'});
        }
        res.status(200).json({
            status:"OK",
            malzemeHead});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMalzemeHead = async (req, res) => {
    const { 
        firma_kodu,
        malzeme_tipi,
        malzeme_kodu, 
        gecerlilik_bas,
        gecerlilik_bit,
        tedarik_tipi,
        malzeme_stok_birimi,
        net_agirlik,
        net_agirlik_birimi,
        brut_agirlik,
        brut_agirlik_birimi,
        urun_agaci_var_mi,
        urun_agaci_tipi,
        urun_agaci_kodu,
        rota_var_mi,
        r_urun_agaci_tipi,
        r_urun_agaci_kodu,
        silindi_mi,
        passif_mi
         } = req.body;

    try {
        await createMalzemeHeadFromDB({ 
        firma_kodu,
        malzeme_tipi,
        malzeme_kodu, 
        gecerlilik_bas,
        gecerlilik_bit,
        tedarik_tipi,
        malzeme_stok_birimi,
        net_agirlik,
        net_agirlik_birimi,
        brut_agirlik,
        brut_agirlik_birimi,
        urun_agaci_var_mi,
        urun_agaci_tipi,
        urun_agaci_kodu,
        rota_var_mi,
        r_urun_agaci_tipi,
        r_urun_agaci_kodu,
        silindi_mi,
        passif_mi
         });

        res.status(201).json({ 
            status:"OK",
            message: 'Malzeme Head created successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMalzemeHead = async (req, res) => {
    const { 
        firma_kodu,
        malzeme_tipi,
        malzeme_kodu, 
        gecerlilik_bas,
        gecerlilik_bit,
        tedarik_tipi,
        malzeme_stok_birimi,
        net_agirlik,
        net_agirlik_birimi,
        brut_agirlik,
        brut_agirlik_birimi,
        urun_agaci_var_mi,
        urun_agaci_tipi,
        urun_agaci_kodu,
        rota_var_mi,
        r_urun_agaci_tipi,
        r_urun_agaci_kodu,
        silindi_mi,
        passif_mi
         } = req.body;
    try {
        const updatedMalzemeHead = await updateMalzemeHeadFromDB({ 
        firma_kodu,
        malzeme_tipi,
        malzeme_kodu, 
        gecerlilik_bas,
        gecerlilik_bit,
        tedarik_tipi,
        malzeme_stok_birimi,
        net_agirlik,
        net_agirlik_birimi,
        brut_agirlik,
        brut_agirlik_birimi,
        urun_agaci_var_mi,
        urun_agaci_tipi,
        urun_agaci_kodu,
        rota_var_mi,
        r_urun_agaci_tipi,
        r_urun_agaci_kodu,
        silindi_mi,
        passif_mi
         });
        if (updatedMalzemeHead === 0) {
            return res.status(404).json({ message: 'Malzeme Head not found' });
        }
        res.status(200).json({
            status:"OK", 
            message: 'Malzeme Head updated successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMalzemeHead = async (req, res) => {
    const {firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit} = req.query;
    try {
        const deletedMalzemeHead = await deleteMalzemeHeadFromDB({firma_kodu,malzeme_tipi,malzeme_kodu,gecerlilik_bas,gecerlilik_bit});
        if (deletedMalzemeHead === 0) {
            return res.status(404).json({ message: 'Malzeme Head not found' });
        }
        res.json({ message: 'Malzeme Head deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMalzemeHead,
    getMalzemeHead,
    createMalzemeHead,
    updateMalzemeHead,
    deleteMalzemeHead,
};