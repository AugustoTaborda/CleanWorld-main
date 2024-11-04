const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");
const bcrypt = require("bcrypt");


async function getAllUser(){
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query("SELECT * FROM `user`");

    await connection.end();

    return rows;

};

async function createUser(name, cpf, phone, birthDate, userType, email, password){

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    senhaUsuario = passwordHash;

    const connection = await mysql.createConnection(databaseConfig);

    const insertUsuario = "INSERT INTO `user`(name,cpf,phone,birthDate,userType,email,password) values (?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?, ?, ?)";

    await connection.query(insertUsuario,[name, cpf, phone, birthDate, userType, email, passwordHash])

    await connection.end();
}


async function updateUser(idUser, name, cpf, phone, birthDate, userType, email, password){
    
    const connection = await mysql.createConnection(databaseConfig);  
    
    const updateUsuario = "UPDATE user SET name = ?, cpf = ?, phone = ?,birthDate = ?, userType = ?, email = ? , password = ?,  where idUser = ?";
    
    await connection.query(updateUsuario,[idUser, name, cpf, phone, birthDate, userType, email, password])
    
    await connection.end();

};

async function deleteUser(idUser){
    const connection = await mysql.createConnection(databaseConfig);

    try {
    const [result] = await connection.query("DELETE FROM user WHERE idUser = ?", [idUser]);
    console.log(`Rows affected: ${result.affectedRows}`);
    }catch (error) {
        console.error("Error deleting user:", error);
    }

    await connection.end();
}

async function getUserById(idUser){
    const connection = await mysql.createConnection(databaseConfig);

    const [user] = await connection.query("SELECT * FROM user WHERE idUser = ?", [idUser]);

    await connection.end();

    return user;
}

async function validateUsuario(email, senhaUsuario) {

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(senhaUsuario, salt);

    const connection = await mysql.createConnection(databaseConfig);
    
    const [usuario] = await connection.query("SELECT * FROM usuario WHERE email = ?", [email]);

    if (bcrypt.compareSync(senhaUsuario, passwordHash) == true && usuario[0].email == email) {

        return usuario;
    };

}

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    validateUsuario,
};