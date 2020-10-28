const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.use(authMiddleware);

router.get('/:userId', async (req, res) => {
    try{
      const usuario = await Usuario.findById(req.params.userId);

      usuario.senha = undefined;

      return res.send({ usuario});      
    } catch (err) {
      return res.status(400).send({ mensagem: "usuário não encontrado"})
    }
  });

module.exports = app => app.use('/Search', router);  