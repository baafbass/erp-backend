const {
	getAllIsMerkezlerTextFromDB,
	getIsMerkezTextFromDB,
	createIsMerkezTextFromDB,
	updateIsMerkezTextFromDB,
    deleteIsMerkezTextFromDB
} = require('../../repositories/IsMerkezleri/isMerkezText.repository')

const getAllIsMerkezlerText = async () => {
      const isMerkezTexts = await getAllIsMerkezlerTextFromDB();
      return isMerkezTexts;
}

const getIsMerkezText = async (is_merk_text_keys) => {
     const isMerkezText = await getIsMerkezTextFromDB(is_merk_text_keys);
     return isMerkezText;
}

const createIsMerkezText = async (is_merk_text) => {
      await createIsMerkezTextFromDB(is_merk_text);
}

const updateIsMerkezText = async (is_merk_text) => {
     await updateIsMerkezTextFromDB(is_merk_text);
}

const deleteIsMerkezText = async (is_merk_text_keys) => {
     const deletedIsMerkText = await deleteIsMerkezTextFromDB(is_merk_text_keys);
     return deletedIsMerkText;
}

module.exports = {
	getAllIsMerkezlerText,
	getIsMerkezText,
	createIsMerkezText,
	updateIsMerkezText,
	deleteIsMerkezText
}