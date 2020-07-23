const express = require('express');
const methodOverride = require('method-override');
const app = express();
const session= require('express-session');
const cookieParser = require('cookie-parser')
const acceso = require ('./middleware/acceso')

// Archivos estaticos

app.use(express.static('public'));

app.use(session({
    secret: 'secreto!!!!',
    resave: true,
    saveUninitialized: true}));

//Considerar que al enviar los datos desde el formulario los mismos lleguen al Servidor
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use (acceso)
//Middleware para determinar metodos HTTP distintos a los aceptados por los formularios (GET - POST)
app.use(methodOverride('_method'));

//Aca instalamos EJS
app.set('view engine', 'ejs');

//Por aca vamos a requerir las rutas/
const productoRoutes = require('./routes/productoRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const comprasRoutes= require('./routes/comprasRoutes');
const webRoutes = require('./routes/webRoutes');


//aca empieza el recorrido :)
app.use(productoRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(comprasRoutes);
app.use(webRoutes);




//levantamos el server.
app.listen(3000,()=> console.log('Servidor activo puerto 3000'));
