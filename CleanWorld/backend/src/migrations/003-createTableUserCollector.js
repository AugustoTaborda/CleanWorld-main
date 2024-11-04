const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createTableUserCollector(){
    
    try{
        const connection = await mysql.createConnection(databaseConfig);

        await connection.query(`USE ${databaseConfig.database}`);

        await connection.query(`CREATE TABLE IF NOT EXISTS userCollector (
            idUserCollector INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            idUser INT,
            idRegisterVehicle INT,
            FOREIGN KEY (idUser) REFERENCES user(idUser),
            FOREIGN KEY (idRegisterVehicle) REFERENCES registerVehicle(idRegisterVehicle)
        )`);

        await connection.end();

        console.log(`Table userCollector created !`);
    }catch(error){
        console.log(`Error creating table: ${error}`);
    }
};

createTableUserCollector();
