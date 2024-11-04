const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createTableUserDiscard(){
    try{
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS userDiscard(
        idUserDiscard INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        idUser INT,
        FOREIGN KEY (idUser) REFERENCES user(idUser)
    )`);

    await connection.end();
    console.log(`Table Descartante created!`);

} catch(error){
    console.log(`Error creating table: ${error}`);
}
};

createTableUserDiscard();