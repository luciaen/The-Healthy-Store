//Requiero Express
const express = require('express');
const app = express();


// Archivos estaticos

app.use(express.static('public'));


//Aca instalamos EJ proximamente

//Por aca vamos a requerir las rutas/
const pruebaRoutes = require('./routes/pruebaRoutes')






//aca empieza el recorrido :)
app.use(pruebaRoutes)






//levantamos el server.
app.listen(3000,()=> console.log('Servidor activo puerto 3000'));
