const {
	getAllIsMerkezlerHeadFromDB,
	getIsMerkezHeadFromDB,
	createIsMerkezHeadFromDB,
	updateIsMerkezHeadFromDB,
	deleteIsMerkezHeadFromDB,
} = require('../../repositories/IsMerkezleri/isMerkezHead.repository')

const getAllIsMerkezlerHead = async () => {
	const isMerkezlerHeads = await getAllIsMerkezlerHeadFromDB();
	return isMerkezlerHeads;
}

const getIsMerkezHead = async (is_merk_head_keys) => {
	const isMerkezHead = await getIsMerkezHeadFromDB(is_merk_head_keys);
	return isMerkezHead;
}

const createIsMerkezHead = async (is_merk_head) => {
	await createIsMerkezHeadFromDB(is_merk_head);
}

const updateIsMerkezHead = async (is_merk_head) => {
	await updateIsMerkezHeadFromDB(is_merk_head);
}

const deleteIsMerkezHead = async (is_merk_head_keys) => {
	const deletedIsMerkezHead = await deleteIsMerkezHeadFromDB(is_merk_head_keys);
	return deletedIsMerkezHead;
}

module.exports = {
	getAllIsMerkezlerHead,
	getIsMerkezHead,
	createIsMerkezHead,
	updateIsMerkezHead,
	deleteIsMerkezHead
}