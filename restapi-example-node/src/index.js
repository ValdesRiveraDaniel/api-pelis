const express = require('express');
const app = express();
const morgan = require('morgan');
const conexionDB = require('./db_conexion')



//Conexion base de datos

conexionDB();


//settings 
app.set('port', process.env.PORT || 3000); //en el caso de que se use un puerto estalbecido por el navegador se usa y si no se tomara el 3000
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//routes
app.use('/api/movies', require('./routes/movies'));



//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});