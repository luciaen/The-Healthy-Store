const express = require('express');
const methodOverride = require('method-override');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const acceso = require('./middlewares/acceso');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.use(session({
    secret : 'topSecret',
    resave: true,
    saveUninitialized: true,
}))

app.use(cookieParser());

app.use(acceso);


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

app.listen(4000,()=> console.log('Servidor activo puerto 4000'));
