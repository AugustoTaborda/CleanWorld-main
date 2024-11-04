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
    verifyJWT,
    rotaOK
  }