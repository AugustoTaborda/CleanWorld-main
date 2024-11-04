const userService = require("../service/userService.js");
const jwt = require("jsonwebtoken");
const SECRET = 'Hoisjda9hyg2872ijsadlOOOCleanWorld'

async function getAllUser(req, res) {
  try {
    const rows = await userService.getAllUser();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "error getting users",
      body: error.message,
    });
  }
}

async function createUser(req, res) {
  const { name, cpf, phone, birthDate, userType, email, password } = req.body;

  try {
    await userService.createUser(
      name,
      cpf,
      phone,
      birthDate,
      userType,
      email,
      password
    );

    res.status(201).json({ message: "Sucess" });
  } catch (error) {
    res.status(500).send({
      message: "Error adding user! ",
      body: error.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { idUser } = req.params;
    const { name, cpf, phone, birthDate, userType, email, password } = req.body;

    await userService.updateUser(idUser, name, cpf, phone, birthDate, userType, email, password);

    res.status(201).json({message: "Sucess"});
  } catch (error) {
    res.status(500).send({
      message: "Error updating user!",
      body: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { idUser } = req.params;

    if (!idUser || isNaN(idUser)) {
      return res.status(400).send({ message: "Invalid user ID!" });
    }

    await userService.deleteUser(idUser);

    res.status(200).json({ message: "Sucess" });
  } catch (error) {
    res.status(500).send({
      message: "Error delete user!",
      body: error.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    const { idUser } = req.params;
    const usuario = await userService.getUserById(idUser);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      message: "Error getting user!",
      body: error.message,
    });
  }
}

async function validateLogin(req, res) {

  try {
    const {email, senhaUsuario} = req.body;
    
    const usuarioValidado = await usuarioService.validateUsuario(email, senhaUsuario);

    const usuarioId = usuarioValidado[0].id
    console.log(usuarioId)

    const token = jwt.sign({ usuarioId }, SECRET);
    res.status(200).json({ auth: true, token});
  } catch (error) {
    res.status(401).send({
      message: "Error getting user!",
      body: error.message,
    })
  }
}


function verifyJWT (req, res, next) {

  console.log("verificando")
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if(!token) {
    console.log("nao autorizou")
    return res.status(401).json({ message: "Não autorizado :(" })
  }

  try {

    console.log("chegou aqui")
    jwt.verify(token, SECRET);
    next();

  }catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Token não válido"
    })
  }

}


const rotaOK = async (req, res) => {
  console.log("testando a rota")
  res.status(200).json({ message: "deu boa" })
}


module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  validateLogin,
  verifyJWT,
  rotaOK,
};
