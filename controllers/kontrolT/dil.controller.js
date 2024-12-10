const {
    getAllDilFromDB,
    getDilFromDB,
    createDilFromDB,
    updateDilFromDB,
    deleteDilFromDB
} = require('../../repositories/kontrolT/dil.repository')

const getAllDil = async (req, res) => {
    try {
        const diller = await getAllDilFromDB();
        res.status(200).json({
            status:"OK",
            diller,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getDil = async (req, res) => {
       const {dil_kodu,firma_kodu} = req.params;
    try {
        const dil = await getDilFromDB(dil_kodu,firma_kodu);
        if (!dil) {
            return res.status(404).json({ message: 'dil not found' });
        }
        res.status(200).json({
            status:"OK",
            dil
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createDil = async (req, res) => {
    const { firma_kodu, dil_kodu, dil_adi } = req.body;
    try {
        await createDilFromDB(firma_kodu, dil_kodu, dil_adi);
        res.status(201).json({
            status:"OK",
            message: 'Dil created successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDil = async (req, res) => {
    const {firma_kodu,dil_kodu, dil_adi } = req.body;
    try {
        const updatedDil = await updateDilFromDB(firma_kodu,dil_kodu, dil_adi);
        if (updatedDil === 0) {
            return res.status(404).json({ message: 'Dil not found' });
        }
        res.status(200).json({
            status:"OK", 
            message: 'Dil updated successfully'
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDil = async (req, res) => {
    const {dil_kodu,firma_kodu} = req.params;

    try {
        const deletedDil = await deleteDilFromDB(dil_kodu,firma_kodu);
        if (deletedDil === 0) {
            return res.status(404).json({ message: 'Dil not found' });
        }
        res.status(200).json({
            status:"OK", 
            message: 'Dil deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllDil,
    getDil,
    createDil,
    updateDil,
    deleteDil,
};