 const {
    getAllUrunAgaciContentFromDB,
    getUrunAgaciContentFromDB,
    createUrunAgaciContentFromDB,
    updateUrunAgaciContentFromDB,
    deleteUrunAgaciContentFromDB
} = require('../../repositories/UrunAgacilari/urunAgaciContent.repository')

const getAllUrunAgaciContent = async () => {
        const urunAgaciContents = await getAllUrunAgaciContentFromDB();
        return urunAgaciContents;
}

const getUrunAgaciContent = async (urun_agaci_content_keys) => {
        const urunAgaciContent = await getUrunAgaciContentFromDB(urun_agaci_content_keys);
        return urunAgaciContent;
};

const createUrunAgaciContent = async (urun_agaci_content) => {
        await createUrunAgaciContentFromDB(urun_agaci_content);

};

const updateUrunAgaciContent = async (urun_agaci_content) => {
    await updateUrunAgaciContentFromDB(urun_agaci_content);
};

const deleteUrunAgaciContent = async (urun_agaci_content_keys) => {
    const deletedUrunAgaciContent = await deleteUrunAgaciContentFromDB(urun_agaci_content_keys);
    return deletedUrunAgaciContent;
};

module.exports = {
    getAllUrunAgaciContent,
    getUrunAgaciContent,
    createUrunAgaciContent,
    updateUrunAgaciContent,
    deleteUrunAgaciContent,
};