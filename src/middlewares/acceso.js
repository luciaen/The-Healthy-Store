const fs = require('fs');
const path = require('path');
const db = require('../database/models/')


const User = db.User;
/*db.users.findAll({
    where: {
        email: req.body.email
    }
})
    .then(user => {
        //acá tu código
    });*/

module.exports = (req, res, next) => {
    res.locals.usuarioLogueado = false;
    if (req.session.usuarioLogueado) {
        
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
        return next();
    } else if (req.cookies.recordarme) {
        
        User.findAll({
            where: { email: req.cookies.recordarme }
        }).then(usuarioLogueado => {
            
            if (usuarioLogueado != undefined) {
               
                delete usuarioLogueado[0].password;
                req.session.usuarioLogueado = usuarioLogueado[0];
                res.locals.usuarioLogueado = usuarioLogueado[0];
            }
            return next();
        }

        ).catch(error => res.send(error))
    } else {
        return next();
    }
}