const {
    getAllMaliyetHeadFromDB,
    getMaliyetHeadFromDB,
    createMaliyetHeadFromDB,
    updateMaliyetHeadFromDB,
    deleteMaliyetHeadFromDB
} = require('../../repositories/MaliyetMerkezleri/maliyetHead.repository')

const getAllMaliyetHead = async () => {
    const maliyetHeads = await getAllMaliyetHeadFromDB();
    return maliyetHeads;
}

const getMaliyetHead = async (maliyet_head_keys) => {
        const maliyetHead = await getMaliyetHeadFromDB(maliyet_head_keys);
        return maliyetHead;
};

const createMaliyetHead = async (maliyet_merk_head) => {
        await createMaliyetHeadFromDB(maliyet_merk_head);
};

const updateMaliyetHead = async (maliyet_merk_head) => {
        await updateMaliyetHeadFromDB(maliyet_merk_head);
};

const deleteMaliyetHead = async (maliyet_head_keys) => {
        const deletedMaliyetHead = await deleteMaliyetHeadFromDB(maliyet_head_keys);
        return deletedMaliyetHead;
};

module.exports = {
    getAllMaliyetHead,
    getMaliyetHead,
    createMaliyetHead,
    updateMaliyetHead,
    deleteMaliyetHead,
};