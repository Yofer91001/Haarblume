const {Router} = require('express');
const mysql = require('mysql');
const {host, user, pass, database, port} = require('../db');
const {promisify} = require("util"); 
const { readdirSync, appendFile } = require('fs');
const bcrypt = require('bcrypt');
const { strictEqual } = require('assert');
const {ver_sesion, crear_sesion} = require("../funciones.js");




//CREAR CONEXION
const connection = mysql.createConnection({
    host: host,
    user: user,
    password: pass,
    database: database,
    port: port
});



//VOLVER UNA PROMESA LAS CONSULTAS
connection.query = promisify(connection.query)



//RONDAS DE ENCRIPTACIÓN
const rondas = 10;


//CREAR ENRUTADOR
const router = Router();


//PANEL ADMIN##############################################
router.get("/admin/panel",(req, res)=>{

    res.render("admin/admin-panel")

});


//RAIZ#####################################################
router.get('/', (req, res) =>{
    
    ver_sesion(req,res,"/", "productos/inicio", "Haarblume", connection);
    
});

//MAYOREO###################################################
router.get("/mayoreo", (req, res)=>{
    
    ver_sesion(req,res,"/mayoreo", "productos/mayoreo/mayoreo", "Ventas por Mayor", connection);
    

});

//SALONES
router.get("/salones", (req, res)=>{

    ver_sesion(req,res,"/salones", "productos/mayoreo/salones", "Ventas por Mayor", connection);


});

//DISTRIBUIDORES
router.get("/subdistribuidores", (req, res)=>{
    ver_sesion(req,res,"/subdistribuidores", "productos/mayoreo/subdistribuidores", "Ventas por Mayor", connection);

});





//ABOUT####################################################
router.get("/about", (req, res)=>{
    ver_sesion(req,res,"/about", "about/about", "About", connection);


})

//BLOG#####################################################
router.get("/blog", (req, res)=>{
    ver_sesion(req,res,"/blog", "blog/blog", "Blog", connection);

});

//CARRITO##################################################
router.get("/carrito", (req, res)=>{
    ver_sesion(req,res,"/carrito", "carrito/carrito", "Carrito", connection);

});


//PRODUCTOS################################################
//LINEAS-----------------------------------------


//PRINCIPAL
router.get("/lineas", (req, res)=>{
    
    ver_sesion(req,res,"/lineas", "productos/lineas/inicio", "Lineas", connection);

});

//DESTACADOS
router.get('/destacados', async (req, res) =>{
    const sql = "SELECT * FROM productos WHERE destacado = ?";
    const datos = ["true"]
    await ver_sesion(req,res,"/destacados", "productos/secciones/destacados", "Destacados", sql);
    

} );

//COCO
router.get("/coco", (req, res)=>{
    const sql = "SELECT * FROM productos WHERE linea = ?";
    const datos = ["coco"] 
    ver_sesion(req, res,"/coco", "productos/lineas/coco", "Haarblume", connection, sql, datos);
    

});

router.post("/coco", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/coco");


});

//CEBOLLA
router.get("/cebolla", (req, res)=>{
    const sql = "SELECT * FROM productos WHERE linea = ?";
    const datos = ["cebolla"] 

    ver_sesion(req, res,"/cebolla", "productos/lineas/cebolla", "Línea Cebolla", connection, sql, datos);

});

router.post("/cebolla", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/cebolla");


});

//3D
router.get("/tresd", (req, res)=>{
    const sql = "SELECT * FROM productos WHERE linea = ?";
    const datos = ["tresd"] 

    ver_sesion(req, res,"/tresd", "productos/lineas/tresd", "Línea 3D", connection, sql, datos);

});

router.post("/tresd", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/tresd");


});



//BOTX
router.get("/botox", (req, res)=>{
    const sql = "SELECT * FROM productos WHERE linea = ?";
    const datos = ["botox"] 

    ver_sesion(req, res,"/botox", "productos/lineas/botox", "Línea Botox", connection, sql, datos);

});

router.post("/botx", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/botx");


});


//SHOCK
router.get("/shock", (req, res)=>{
    const sql = "SELECT * FROM productos WHERE linea = ?";
    const datos = ["shock"] 

    ver_sesion(req, res,"/shock", "productos/lineas/shock", "Línea Shock", connection, sql, datos);

});

router.post("/shock", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/shock");


});


//SECCIONES-------------------------------------
//SHAMPOOS
router.get("/shampoos", (req, res)=>{
    const sql = "SELECT * FROM productos WHERE categoria= ?";
    const datos = ["shampoo"]
  
    ver_sesion(req, res,"/shampoos", "productos/secciones/shampoos", "Shampoo", connection, sql, datos);

}); 

router.post("/shampoos", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/shampoos");


});

//TRATAMIENTOS
router.get("/tratamientos", async (req, res)=>{
    const sql = "SELECT * FROM productos WHERE categoria= ?";
    const datos = ["tratamiento"]
  
    ver_sesion(req, res,"/tratamientos", "productos/secciones/tratamientos", "Haarblume", connection, sql, datos);
    
    

});

router.post("/tratamientos", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/tratamientos");


});

//ALISADORES
router.get("/alisadores", (req, res)=>{
    const sql = "SELECT * FROM productos WHERE categoria= ?";
    const datos = ["alisador"]
  

    ver_sesion(req, res,"/alisadores", "productos/secciones/alisadores", "Alisadores", connection, sql, datos);

});

router.post("/alisadores", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/alisadores");


});


//TONICOS
router.get("/tonicos", (req, res)=>{
    const sql = "SELECT * FROM productos WHERE categoria= ?";
    const datos = ["tonico"]
  

    ver_sesion(req, res,"/tonicos", "productos/secciones/tonicos", "Tónicos", connection, sql, datos);

});

router.post("/tonicos", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/tonicos");


});

//MINOXIDIL
router.get("/minoxidil", (req, res)=>{

    const sql = "SELECT * FROM productos WHERE categoria= ?";
    const datos = ["minoxidil"]
  
    ver_sesion(req, res,"/minoxidil", "productos/secciones/minoxidil", "Minoxidil", connection, sql, datos);

});

router.post("/minoxidil", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/minoxidil");


});


//MASCARILLAS
router.get("/mascarillas", (req, res)=>{

    const sql = "SELECT * FROM productos WHERE categoria= ?";
    const datos = ["mascarilla"]
  
    ver_sesion(req, res,"/mascarillas", "productos/secciones/mascarillas", "Mascarillas", connection, sql, datos);

}); 

router.post("/mascarillas", (req, res)=>{

    //AGREGAR AL CARRITO
    agregar_carrito("producto");

    //REDIRECCIONAR A LA MISMA SECCIÓN
    res.redirect("/mascareillas");


});





//LOGS#####################################
//LOG IN
router.get("/login", async (req, res)=>{
    
    if(req.session.sesion == true){

        const usuario = req.session.nombre;
        
        if(usuario.length > 0 ){
            res.render("productos/inicio", {titulo:"Haarblume", usuario: usuario});

        }else{
            req.session.sesion = false;
            req.session.save((error)=>{
                res.redirect("/login");

            });

        }

    }else{

        res.render("logs/login")

    }

});

router.post("/login", async (req, res)=>{

    

        const {pass, correo} = req.body;
        let consulta = await connection.query("SELECT contraseña,nombre FROM usuarios WHERE correo = ?", [correo]);
        consulta = JSON.stringify(consulta);
        consulta = JSON.parse(consulta);
        consulta = consulta[0];
        

        if( consulta == undefined ){
            res.render("logs/login", {titulo:"Inicio de Sesión", usuario_no_loggeado: true, correo})
            
        }else{
            
            const password = await bcrypt.compare(pass, consulta["contraseña"]);
            if(password){
                crear_sesion(req, res, consulta["contraseña"]);
                req.session.save((error)=>{
                    res.render("productos/inicio", {titulo: "Haarblume", sesion: true, usuario:consulta["nombre"] })
    
                });
            }else{  
                res.render("logs/login", {titulo:"Inicio de Sesión", usuario_no_loggeado: true, correo})
            }
        }
        

    

});

//LOG UP
router.get("/logup", (req, res)=>{



    

    res.render("logs/logup", {titulo: "Log up"});

});

router.post("/logup", async (req, res)=>{
    
    
    const {nombre, correo, pass, pass2} = req.body;
    
    if(nombre && correo && pass && pass2){

        if(pass == pass2){
            
            const conincidencia = await connection.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);
            
            
            if(conincidencia == 0){
        
                bcrypt.hash(pass, rondas, (err, password)=>{
                    connection.query("INSERT INTO usuarios(nombre, correo, contraseña) VALUES(?,?,?)", [nombre, correo, password])
                    
                });


                //CREAR LA SESION

                

                
            }else{
                
                res.render("logs/logup", {titulo: "logup", us:true, nombre:nombre, correo:correo})
            }
        }else{
            
            res.render("logs/logup", {titulo: "logup",con:true, nombre:nombre, correo:correo})
        }
        
        
    }else{
        res.render("logs/logup", {titulo: "logup",datos: true, nombre:nombre, correo:correo})

    }



});

//LOG OUT
router.post("/logout", (req, res)=>{

    //CERRAR LA SESION


    //REDIRECCIONAR AL INICIO
    res.redirect("productos/inicio");

});


//Error 404##########################################
router.get("/*", (req, res)=>{

    res.render("notfound/notfound", {titulo: "404"})

});


module.exports = router;