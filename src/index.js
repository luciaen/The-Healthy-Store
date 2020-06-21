//Requiero Express
const express = require('express');
const app = express();


// Archivos estaticos

app.use(express.static('public'));

//Considerar que al enviar los datos desde el formulario los mismos lleguen al Servidor
app.use(express.urlencoded({ extended: false }));

//Aca instalamos EJS
app.set('view engine', 'ejs');

//Por aca vamos a requerir las rutas/
const productoRoutes = require('./routes/productoRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');


//aca empieza el recorrido :)
app.use(productoRoutes);
app.use(userRoutes);
app.use(adminRoutes);




//levantamos el server.
app.listen(3000,()=> console.log('Servidor activo puerto 3000'));
