const collectorService = require('../service/collectorService.js');

async function getAllCollector(req, res){
    try{
        const rows = await collectorService.getAllCollector();
        res.status(200).json(rows);
    }catch(error){
        res.status(500).send({
            message: "Error getting coletor",
            body: error.message,
        });
    }
}

async function createCollector(req, res){
    const{nameEnterprise, cnpj, phone, userType, email, password} = req.body;
    try{
        await collectorService.createCollector(nameEnterprise, cnpj, phone, userType, email, password);
        res.status(201).json({message:"Sucess"});
    }catch(error){
        res.status(500).send({
            message:"Error adding user!",
            error: error.message
        });
    }
}

async function updateCollector(req, res){
    try{
        const {idCollector}=req.params;
        const {nameEnterprise, phone, password} = req.body;

        await collectorService.updateCollector(idCollector, nameEnterprise, phone, password);
        
        res.status(201).json({message: "Sucess"});    
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}

async function deleteCollector(req, res){
    try{
        const {idCollector} = req.params;

        await collectorService.deleteCollector(idCollector);

        res.status(201).json({ message: "Sucess" });
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}

async function getCollectorById(req, res){
    try{
        const {idCollector} = req.params;

        const coletor = await collectorService.getAllColetorById(idCollector);

        res.status(200).json(coletor);
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}


module.exports = {
    getAllCollector,
    createCollector,
    updateCollector,
    deleteCollector,
    getCollectorById,
}