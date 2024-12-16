const {
	getAllRotaHeadFromDB,
	getRotaHeadFromDB,
	createRotaHeadFromDB,
	updateRotaHeadFromDB,
	deleteRotaHeadFromDB
} = require('../../repositories/Rotalar/rotaHead.repository')


const getAllRotaHead = async () => {
      const rotaHeads = await getAllRotaHeadFromDB();
      return rotaHeads;
}

const getRotaHead = async (rota_head_keys) => {
	const rotaHead = await getRotaHeadFromDB(rota_head_keys);
    return rotaHead;
}

const createRotaHead = async (rota_head) => {
        await createRotaHeadFromDB(rota_head);
}

const updateRotaHead = async (rota_head) => {
       await updateRotaHeadFromDB(rota_head);
}

const deleteRotaHead = async (rota_head_keys) => {
      const deletedRotaHead = await deleteRotaHeadFromDB(rota_head_keys);
      return deletedRotaHead;
}

module.exports = {
   getAllRotaHead,
   getRotaHead,
   createRotaHead,
   updateRotaHead,
   deleteRotaHead
}