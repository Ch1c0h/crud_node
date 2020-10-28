const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    token: String,
    nome:{
        type: String,
        require: true,
    } ,
    email:{
        type:  String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha: {
        type : String,
        required: true,
        select: false,
    },
    data_criacao:{
        type: Date,
        default: Date.now
    },
    data_atualizacao: Date,
    ultimo_login: Date,
    telefones: [{
        numero: {type: String},
        ddd: {type: String},
    }]

});

UsuarioSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);
module.exports = Usuario;