import Producto from "../models/Producto.js";

export async function listarProductos(req,res) {
    try {
       const pagina = Number(req.query.page || 1);
        const offset = (pagina - 1) * 6;
        console.log(offset);
        
        const productos = await Producto.obtenerActivos(offset);
        res.json(productos);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje:"No se pudieron obtener los productos"
        })

    }
}
export async function listarCategorias(req, res) {
    try{
        const categorias = await Producto.obtenerCategoriasActivas();
        res.json(categorias);
    } catch(error){
        console.error(error);
        res.status(500).json({
            mensaje: "no se pudieron obtener categorias"
        })
        
    }
}