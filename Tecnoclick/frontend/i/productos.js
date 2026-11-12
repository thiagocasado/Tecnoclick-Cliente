const contenedorProductos = document.querySelector("#contenedor-productos");
const producto ={
    id: 1,
    name: "Teclado usb",
    categoria: "teclados",
    precio: 15000,
    activo: true

};
const carrito = [];
const contador = document.querySelector("#contador")
contenedorProductos.innerHTML = `
    <div class= "tipo-producto">
        <h2>${producto.name} </h2>
        <p>Categoria: ${producto.categoria}</p>
        <p>Precio: ${producto.precio}</p>
        <button id="botonAgregar">Agregar al carrito</button>
    </div>
`
const botonAgregar = document.querySelector("#botonAgregar");
botonAgregar.addEventListener("click", function(){
    carrito.push(producto)
    contador.textContent = carrito.length;
    console.log(carrito);
    
})
