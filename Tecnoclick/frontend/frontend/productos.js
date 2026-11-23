const contenedorProductos = document.querySelector("#contenedor-productos");
const contenedorCarrito = document.querySelector("#contenedor-carrito")
let  productos = [ ];
const carrito = [];
const contador = document.querySelector("#contador")

function actualizarContador() {
    let totalProductos = 0;

    carrito.forEach(function(item) {
        totalProductos += item.cantidad;
    });

    contador.textContent = totalProductos;
}
function mostrarCarrito() {
    contenedorCarrito.innerHTML="";
    carrito.forEach(function(item){
        contenedorCarrito.innerHTML +=`
            <p>${item.nombre} - Cantidad: ${item.cantidad}</p>
            <button class="botonEliminar">Quitar una unidad</button>
        `
    });
   
    const botonesEliminar = document.querySelectorAll(".botonEliminar");
    botonesEliminar.forEach(function(boton,indice){
        boton.addEventListener("click",function(){
            const productoAEliminar = carrito[indice];
            productoAEliminar.cantidad --;
            if (productoAEliminar.cantidad ===0) {
                carrito.splice(indice,1)
            }
            actualizarContador();
             calcularTotal();
            mostrarCarrito();
        });
    });

    
}
function mostrarProductos() {
    contenedorProductos.innerHTML ="";
    productos.forEach(function(producto) {
        contenedorProductos.innerHTML += `
            <div class="tipo-producto">
            <h2> ${producto.nombre}</h2>
            <p> Categoria: ${producto.categoria}</p>
            <p> Precio: ${producto.precio} </p>
            <button class="botonAgregar" data-id="${producto.id}"> Agregar producto al carrito </button>
            </div>
            `
        console.log(producto.nombre);
    })};

function activarBotonesAgregar() {
    

    const botonAgregar = document.querySelectorAll(".botonAgregar");
    botonAgregar.forEach(function(boton, indice){
        boton.addEventListener("click", function(){
        const productoSeleccionado = productos[indice];
        const productoEncontrado = carrito.find(function(item){
                return item.id === productoSeleccionado.id
        });
        if (productoEncontrado === undefined) {
            const productoParaCarrito ={
                id: productoSeleccionado.id,
                nombre:productoSeleccionado.nombre,
                categoria:productoSeleccionado.categoria,
                precio:productoSeleccionado.precio,
                activo:productoSeleccionado.activo,
                cantidad:1
            };
                carrito.push(productoParaCarrito);
            }    
            else {
                productoEncontrado.cantidad++;
                
            }
        actualizarContador();
        calcularTotal();
        mostrarCarrito();
        console.log(carrito);
    

       });
    })};     

const totalCarrito = document.querySelector("#totalCarrito");
function calcularTotal() {
    let total = 0;
    carrito.forEach(function(item){
    total += item.cantidad * item.precio;
    });

    totalCarrito.textContent = `$${total}`;
}

async function probarConexion(pagina = 1) {
    const urlBase =  "http://localhost:3000/api/productos";
    const respuesta = await fetch(`${urlBase}?page=${pagina}`);
    const datos = await respuesta.json();
    productos = datos;
    mostrarProductos();
    activarBotonesAgregar();
    
}
probarConexion();