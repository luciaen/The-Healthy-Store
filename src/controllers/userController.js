const path = require('path');
const fs = require('fs');
const { response } = require('express');



module.exports = {
        
    login: function (req, res) {

        res.render(path.resolve(__dirname, '..', 'views', 'login'));
    },
    registro: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'registro'));
    },
    save: (req, res) => {
            
            let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/usuarios.json')));
            
            //Solución a la prblemática de el id duplicado
            let usuariosTotales = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/usuarios.json')));
            let ultimoUsuario = usuariosTotales.pop();
           
            let nuevoUsuario = {
                id: ultimoUsuario.id + 1,
                nombre: req.body.nombre,
                Email: req.body.Email,
                Teléfono: req.body.Teléfono,
                Contraseña: req.body.Contraseña                
            }
         usuarios.push(nuevoUsuario);
        let UsuariosJSON = JSON.stringify(usuarios, null, 2);
         fs.writeFileSync(path.resolve(__dirname, '../models/usuarios.json'), usuariosJSON);
         res.redirect('/');
}
}

