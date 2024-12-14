const {
    getAllMaliyetTextFromDB,
    getMaliyetTextFromDB,
    createMaliyetTextFromDB,
    updateMaliyetTextFromDB,
    deleteMaliyetTextFromDB
} = require('../../repositories/MaliyetMerkezleri/maliyetText.repository')

const getAllMaliyetText = async () => {
        const maliyetTexts = await getAllMaliyetTextFromDB();
        return maliyetTexts;
}

const getMaliyetText = async (maliyet_text_keys) => {
    const maliyetText = await getMaliyetTextFromDB(maliyet_text_keys);
    return maliyetText;
};

const createMaliyetText = async (maliyet_merk_text) => {
        await createMaliyetTextFromDB(maliyet_merk_text);
};

const updateMaliyetText = async (maliyet_merk_text) => {
     await updateMaliyetTextFromDB(maliyet_merk_text);
};

const deleteMaliyetText = async (maliyet_text_keys) => {
        const deletedMaliyetText = await deleteMaliyetTextFromDB(maliyet_text_keys);
        return deletedMaliyetText;
};

module.exports = {
    getAllMaliyetText,
    getMaliyetText,
    createMaliyetText,
    updateMaliyetText,
    deleteMaliyetText,
};