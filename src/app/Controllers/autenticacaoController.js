const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const authConfig = require('../../config/auth.json')
const Usuario = require('../models/Usuario');
const router = express.Router();

router.post('/SignUp', async (req, res) => {
    const { nome, email, senha, telefones } = req.body;
    
    try {

        if (await Usuario.findOne({ email })) 
            return res.status(400).send({ mensagem: 'E-mail já existente'});

      data_criacao = moment().format();
      const usuario = await Usuario.create({
        nome, 
        email,
        senha,
        data_criacao,
        ultimo_login: data_criacao,
        telefones
      });

        usuario.senha = undefined;

        const token = jwt.sign({ id: usuario.id}, authConfig.secret, {
          expiresIn: 86400,
        });

        const usuarioLogado = await usuario.update({
          token: token 
        });        

        return res.send({ usuario, token });

    }catch(err) {
        return res.status(400).send({ mensagem: 'Registration failed' });
    }
});

router.post('/SignIn', async(req, res)=> {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email }).select('+senha');

    if (!usuario)
        return res.status(400).send({ mensagem: 'usuário e/ou senha inválidos'})

    if (!await bcrypt.compare(senha, usuario.senha))    
        return res.status(401).send({ mensagem: 'usuário e/ou senha inválidos'})

      usuario.senha = undefined;

      dataAtual = moment().format();

      const usuarioLogado = await Usuario.update({
        ultimo_login: dataAtual
      });

     res.send({ usuario });   

});

module.exports = app => app.use('/auth', router);