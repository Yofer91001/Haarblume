//IMPORTACIONES
const express = require('express');
const morgan = require("morgan");
const path = require('path');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require("express-session");




//CRREACION DE LA APP
const app = express();

//MIDLEWARES
app.use(morgan("dev"));
app.use( express.static(path.join(__dirname + "public")));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(session({
    secret: "123456789124",
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 1000 *60 * 20, secure: true, sameSite: "none"},
    
})); 
 
//SETTINGS
app.set("views", path.join(__dirname + "/public/views"));
app.engine(".hbs", engine({
    defaultLayout: "main",
    layoutDir: path.join(app.get("views"), "layouts"), 
    partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs"
    
    }));
app.set("view engine", ".hbs");



//RUTAS
app.use(require("./routes"));



//INICIAR CONEXION
app.listen(8080);




