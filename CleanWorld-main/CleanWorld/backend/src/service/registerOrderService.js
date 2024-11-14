const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function getAllRegisterOrder(){
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query("SELECT * FROM RegisterOrder");

    await connection.end();

    return rows;
}

async function createRegisterOrder(quantityVolume, volumeSize, collectionDate, collectionTime, materialDescription, status, idUser, idCollector){

    const connection = await mysql.createConnection(databaseConfig);

    const insertRegisterOrder = "INSERT INTO RegisterOrder(quantityVolume, volumeSize, collectionDate, collectionTime, materialDescription, status, idUser, idCollector) VALUES (?,?,?,?,?,?,?,?)";

    await connection.query(insertRegisterOrder, [quantityVolume, volumeSize, collectionDate, collectionTime, materialDescription, status, idUser, idCollector])

    await connection.end();
}

async function updateRegisterOrder(idRegisterOrder, quantityVolume, volumeSize, collectionDate, collectionTime, materialDescription, status, idUser, idCollector){
    const connection = await mysql.createConnection(databaseConfig);
    
    const updateRegisterOrder = "UPDATE RegisterOrder SET idRegisterOrder = ?, quantityVolume = ?, volumeSize = ?, collectionDate = ?, collectionTime = ?, materialDescription = ?, status = ?, idUser = ?, idCollector = ? WHERE idRegisterOrder = ?";

    await connection.query(updateRegisterOrder,[idRegisterOrder, quantityVolume, volumeSize, collectionDate, collectionTime, materialDescription, status, idUser, idCollector]);

    await connection.end();
}

async function deleteRegisterOrder (idRegisterOrder){
    const connection = mysql.createConnection(databaseConfig);

    await connection.query("DELETE FROM RegisterOrder WHERE idRegisterOrder = ?", [idRegisterOrder])

    await connection.end();
}

async function getRegisterOrderById(idCollector){
    
    const connection = await mysql.createConnection(databaseConfig);

    const [coletor] = await connection.query(`SELECT * FROM RegisterOrder WHERE idCollector = ?`, [idCollector]);

    await connection.end();
    
    return coletor;
}

module.exports = {
    getAllRegisterOrder,
    createRegisterOrder,
    updateRegisterOrder,
    deleteRegisterOrder,
    getRegisterOrderById
};

