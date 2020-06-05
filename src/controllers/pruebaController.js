//requerimos Path
const path = require('path');

//armamos el controlador//

const pruebaController = {
    index: function(req,res){
        res.sendFile(path.resolve(__dirname,'../views/prueba/index.html'))
    }
}





//hacemos el module.export

module.exports = pruebaController;