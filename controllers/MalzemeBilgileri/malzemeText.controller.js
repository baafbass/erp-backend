const {
    getAllMalzemeTextFromDB,
    getMalzemeTextFromDB,
    createMalzemeTextFromDB,
    updateMalzemeTextFromDB,
    deleteMalzemeTextFromDB
} = require('../../repositories/MalzemeBilgileri/malzemeText.repository')

const getAllMalzemeText = async () => {
        const malzemeTexts = await getAllMalzemeTextFromDB();
        return malzemeTexts;
}

const getMalzemeText = async (malzeme_text_keys) => {
        const malzemeText = await getMalzemeTextFromDB(malzeme_text_keys);
        return malzemeText;
};

const createMalzemeText = async (malzeme_text_bilgileri) => {
        await createMalzemeTextFromDB(malzeme_text_bilgileri);
};

const updateMalzemeText = async (malzeme_text_bilgileri) => {
        await updateMalzemeTextFromDB(malzeme_text_bilgileri);
};

const deleteMalzemeText = async (malzeme_text_keys) => {
    const deletedMalzemeText = await deleteMalzemeTextFromDB(malzeme_text_keys);
    return deletedMalzemeText;
};

module.exports = {
    getAllMalzemeText,
    getMalzemeText,
    createMalzemeText,
    updateMalzemeText,
    deleteMalzemeText,
};