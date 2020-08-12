const fs = require('fs');
const path = require('path');
const db = require('../database/models/')


const User = db.User;

module.exports = (req, res, next) => {
    res.locals.usuarioLogueado = false;
    if (req.session.usuarioLogueado) {
        
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
        return next();
    } else if (req.cookies.recordame) {
        
        User.findAll({
            where: { email: req.cookies.recordame }
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