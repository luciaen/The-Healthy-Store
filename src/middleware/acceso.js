const fs = require ('fs')
const path = require ('path')

const archivoUsuarios = JSON.parse(fs.readFileSync (path.resolve(__dirname, '..', 'data', 'usuarios.json')));

module.exports = (req,res,next)=>{
    res.locals.usuario = false;
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
       }else if(res.cookie.email){
       let usuario= archivoUsuarios.find(usuario => usuario.email == req.cookies.email)
       delete usuario.password;
       req.session.usuario = usuario;
       res.locals.usuario = usuario;
        next();
      }else{
      return next();
      }
}