const registerOrderService = require("../service/registerOrderService");

async function getAllRegisterOrder(req, res) {
    try{
        const rows = await registerOrderService.getAllRegisterOrder();
        res.status(200).json(rows);
    }catch(error){
        res.status(500).send({
            message: "Error getting RegisterOrders",
            body: error.message
        })
    }
}

async function createRegisterOrder(req, res) {
    const {quantityVolume, volumeSize, collectionDate, collectionTime, materialDescription, status, idUser, idCollector} = req.body

    try{

        await registerOrderService.createRegisterOrder(quantityVolume, volumeSize, collectionDate, collectionTime, materialDescription, status, idUser, idCollector);

        res.status(201).json({message: "Sucess"})

    }catch(error){
        res.status(500).send({
            message: "Error adding RegisterOrder!"
        })
    }
}


async function updateRegisterOrder(req, res){
    try{
        const {idRegisterOrder}=req.params;
        const {quantityVolume, volumeSize, collectionDate, collectionTime, materialDescription, status, idUser, idCollector} = req.body;

        await registerOrderService.RegisterOrder(idRegisterOrder,quantityVolume, volumeSize, collectionDate, collectionTime, materialDescription, status, idUser, idCollector);
        
        res.status(201).json({message: "Sucess"});    
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}

async function deleteRegisterOrder(req, res){
    try{
        const {idRegisterOrder} = req.params;

        await registerOrderService.deleteRegisterOrder(idRegisterOrder);

        res.status(201).json({ message: "Sucess" });
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}

async function getRegisterOrderById(req, res){
    try{
        const {idRegisterOrder} = req.params;

        const coletor = await registerOrderService.getRegisterOrderById(idRegisterOrder);

        res.status(200).json(coletor);
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}

module.exports = {
    getAllRegisterOrder,
    createRegisterOrder,
    updateRegisterOrder,
    deleteRegisterOrder,
    getRegisterOrderById
}