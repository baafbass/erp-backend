const {
    getAllUrunAgaciHeadFromDB,
    getUrunAgaciHeadFromDB,
    createUrunAgaciHeadFromDB,
    updateUrunAgaciHeadFromDB,
    deleteUrunAgaciHeadFromDB
} = require('../../repositories/UrunAgacilari/urunAgaciHead.repository')

const getAllUrunAgaciHead = async () => {
        const urunAgaciHeads = await getAllUrunAgaciHeadFromDB();
        return urunAgaciHeads;
}

const getUrunAgaciHead = async (urun_agaci_head_keys) => {
        const urunAgaciHead = await getUrunAgaciHeadFromDB(urun_agaci_head_keys);
        return urunAgaciHead;
};

const createUrunAgaciHead = async (urun_agaci_head) => {
        await createUrunAgaciHeadFromDB(urun_agaci_head);
};

const updateUrunAgaciHead = async (urun_agaci_head) => {
        await updateUrunAgaciHeadFromDB(urun_agaci_head);

};

const deleteUrunAgaciHead = async (urun_agaci_head_keys) => {
        const deletedUrunAgaciHead = await deleteUrunAgaciHeadFromDB(urun_agaci_head_keys);
        return deleteUrunAgaciHead;
};

module.exports = {
    getAllUrunAgaciHead,
    getUrunAgaciHead,
    createUrunAgaciHead,
    updateUrunAgaciHead,
    deleteUrunAgaciHead,
};