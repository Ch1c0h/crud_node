const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if(!authHeader)
    return res.status(401).send({ mensagem: "Token não informado"});

  const parts = authHeader.split(' ');  

  if (!parts.lenght === 2)
    return res.status(401).send({ mensagem: "Erro no Token"});

    const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ mensagem: "Token mal formatado"});
 
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ mensagem: "Não autorizado "});
    

    req.userId = decoded.id;

  })

  return next();

};