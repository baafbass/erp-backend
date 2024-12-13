const {
    getAllMalzemeHeadFromDB,
    getMalzemeHeadFromDB,
    createMalzemeHeadFromDB,
    updateMalzemeHeadFromDB,
    deleteMalzemeHeadFromDB
} = require('../../repositories/MalzemeBilgileri/malzemeHead.repository')

const getAllMalzemeHead = async () => {
        const malzemeHeads = await getAllMalzemeHeadFromDB();
        return malzemeHeads;
}

const getMalzemeHead = async (malzeme_head_keys) => {
        const malzemeHead = await getMalzemeHeadFromDB(malzeme_head_keys);
        return malzemeHead;
};

const createMalzemeHead = async (malzeme_head_bilgileri) => {
        await createMalzemeHeadFromDB(malzeme_head_bilgileri);
};

const updateMalzemeHead = async (malzeme_head_bilgileri) => {
        await updateMalzemeHeadFromDB(malzeme_head_bilgileri);
};

const deleteMalzemeHead = async (malzeme_head_keys) => {
    const deletedMalzemeHead = await deleteMalzemeHeadFromDB(malzeme_head_keys);
    return deletedMalzemeHead;
};

module.exports = {
    getAllMalzemeHead,
    getMalzemeHead,
    createMalzemeHead,
    updateMalzemeHead,
    deleteMalzemeHead,
};