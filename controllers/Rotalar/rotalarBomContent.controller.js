const {
	getAllRotaBOMFromDB,
	getRotaBOMFromDB,
	createRotaBOMFromDB,
	updateRotaBOMFromDB,
	deleteRotaBOMFromDB
} = require('../../repositories/Rotalar/rotaBomContent.repository');


const getAllRotaBOM = async () =>{
	const rotaBOMs = await getAllRotaBOMFromDB();
    return rotaBOMs;
}

const getRotaBOM = async (rota_bom_keys) => {
   const rotaBOM = getRotaBOMFromDB(rota_bom_keys);
   return rotaBOM;
}

const createRotaBOM = async (rota_bom) => {
	await createRotaBOMFromDB(rota_bom);
}

const updateRotaBOM = async (rota_bom) => {
    await updateRotaBOMFromDB(rota_bom);
}

const deleteRotaBOM = async (rota_bom_keys) => {
   const deletedRotaBom = await deleteRotaBOMFromDB(rota_bom_keys);
   return deletedRotaBom;
}

module.exports = {
   getAllRotaBOM,
   getRotaBOM,
   createRotaBOM,
   updateRotaBOM,
   deleteRotaBOM
}