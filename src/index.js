const express = require('express');
const methodOverride = require('method-override');
const app = express();

//Requerimos los paquetes de session y cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');

//requerimos el middleware acceso
const acceso = require('./middlewares/acceso');

// Archivos estaticos

app.use(express.static('public'));

//Considerar que al enviar los datos desde el formulario los mismos lleguen al Servidor
app.use(express.urlencoded({ extended: false }));

//Middleware para determinar metodos HTTP distintos a los aceptados por los formularios (GET - POST)
app.use(methodOverride('_method'));

//middlewares de session y cookies

app.use(session({
    secret : 'topSecret',
    resave: true,
    saveUninitialized: true,
}))

app.use(cookieParser());

app.use(acceso);

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
