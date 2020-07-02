const path = require('path');
const fs = require('fs');
let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/usuarios.json')));

const userController = {
        
    login: function (req, res) {

        res.render(path.resolve(__dirname, '..', 'views','user', 'login'));
    },
    registro: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','user', 'registro'));
    },

    save: function (req, res) {
            let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/usuarios.json')));
            let usuariosTotales = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/usuarios.json')));
            let ultimoUsuario = usuariosTotales.pop();

            let nuevoUsuario = {
                id: ultimoUsuario.id + 1,
                nombre: req.body.nombre,
                email: req.body.email,
                telefono: req.body.telefono,
                contraseña: req.body.contraseña
            
            }
            usuarios.push(nuevoUsuario);
            usuariosJSON = JSON.stringify(usuarios, null, 2);
            fs.writeFileSync(path.resolve(__dirname, '../models/usuarios.json'), usuariosJSON);
            res.redirect('/registro');
    }
}

module.exports = userController;
