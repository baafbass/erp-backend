const {
	getAllRotaOprFromDB,
	getRotaOprFromDB,
	createRotaOprFromDB,
	updateRotaOprFromDB,
	deleteRotaOprFromDB
} = require('../../repositories/Rotalar/rotaOprContent.repository')

const getAllRotaOpr = async () => {
    const rotaOprs = await getAllRotaOprFromDB();
    return rotaOprs;
}

const getRotaOpr = async (rota_opr_keys) => {
    const rotaOpr = await getRotaOprFromDB(rota_opr_keys);
    return rotaOpr;
}

const createRotaOpr = async (rota_opr) => {
         await createRotaOprFromDB(rota_opr);
}

const updateRotaOpr = async (rota_opr) => {
        await updateRotaOprFromDB(rota_opr);
}

const deleteRotaOpr = async (rota_opr_keys) => {
      const deletedRota = await deleteRotaOprFromDB(rota_opr_keys);
      return deletedRota;
}

module.exports = {
	getAllRotaOpr,
	getRotaOpr,
	createRotaOpr,
	updateRotaOpr,
	deleteRotaOpr
}