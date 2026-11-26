import db from "../database/db.js";

async function obtenerTodos(){
    const [productos] = await db.query(
        "select * from productos"
    );
    return productos;
}
async function obtenerActivos(offset = 0, categoria){
    let sql = "select *from productos where activo = 1";
    const valores = [];

    if (categoria){
        sql += " and categoria = ?";
        valores.push(categoria);
    }
    sql += " order by id limit 6 offset ?";
    valores.push(offset);
    const [productos] = await db.query(sql,valores);
    return productos;
}

async function  obtenerCategoriasActivas() {
    const [categorias] = await db.query(
        "select distinct categoria from productos where activo = 1"
    );
    return categorias;    
}

/*
// PRUBEA POR CONSOLA
async function probarProductos(){
    try {
        const productos = await obtenerTodos();
        console.table(productos);
    }catch(error){
        console.error(error);
    }finally{
        await db.end();
    }
}

probarProductos();*/
export default{
    obtenerTodos,
    obtenerActivos,
    obtenerCategoriasActivas
}