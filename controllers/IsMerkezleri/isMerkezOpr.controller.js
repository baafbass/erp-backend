const {
	getAllIsMerkezlerOprFromDB,
	getIsMerkezOprFromDB,
	createIsMerkezOprFromDB,
	updateIsMerkezOprFromDB,
	deleteIsMerkezOprFromDB
} = require('../../repositories/IsMerkezleri/isMerkezOpr.repository')

const getAllIsMerkezlerOpr = async () => {
     const isMerkezOprs = await getAllIsMerkezlerOprFromDB();
     return isMerkezOprs;
}

const getIsMerkezOpr = async (is_merk_opr_keys) => {
     const isMerkezOpr = await getIsMerkezOprFromDB(is_merk_opr_keys);
     return isMerkezOpr;
}

const createIsMerkezOpr = async (is_merk_opr) => {
     await createIsMerkezOprFromDB(is_merk_opr);
}

const updateIsMerkezOpr = async (is_merk_opr) => {
     await updateIsMerkezOprFromDB(is_merk_opr);
}

const deleteIsMerkezOpr = async (is_merk_opr_keys) => {
     const deletedIsMerkOpr = await deleteIsMerkezOprFromDB(is_merk_opr_keys);
     return deletedIsMerkOpr;
}

module.exports = {
	getAllIsMerkezlerOpr,
	getIsMerkezOpr,
	createIsMerkezOpr,
	updateIsMerkezOpr,
	deleteIsMerkezOpr
}