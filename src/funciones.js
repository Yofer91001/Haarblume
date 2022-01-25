function agregar_carrito(connection, producto){
        
    

}

function eliminar_carrito(connection, producto){



}

function disminuir_cantidad(connection, producto){



}

async function ver_sesion(req,res, direccion, layout, titulo,connection,sql = "SELECT * FROM productos LIMIT 1", datos = []){
    let consulta  = await connection.query(sql, datos);
    consulta = JSON.stringify(consulta);
    consulta = JSON.parse(consulta);
    
    
    
    if(req.session.sesion == true){
        
        const usuario = req.session.nombre;
        
        if(usuario.length > 0 ){
            
            res.render(layout, {titulo:titulo, session: true, usuario: usuario, productos: consulta});
            
        }else{
            res.session.sesion = false;
            res.session.save((error)=>{
                res.redirect(direccion);

            });
            
        }

    }else{
        
        res.render(layout, {titulo: titulo, productos: consulta});

    }


}

function crear_sesion(req, res, nombre){
    res.session.sesion = true;
    res.session.nombre = nombre;

}

module.exports = {ver_sesion, crear_sesion,disminuir_cantidad, agregar_carrito, eliminar_carrito};