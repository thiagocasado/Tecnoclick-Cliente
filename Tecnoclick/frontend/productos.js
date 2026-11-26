const nombreCliente = sessionStorage.getItem("nombreCliente");
const saludoCliente = document.querySelector("#saludo-cliente")
if (nombreCliente) {
    saludoCliente.textContent = `Hola, ${nombreCliente}`
}

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
            <img src="http://localhost:3000${producto.imagen}" alt ="Foto del producto" width="160">
            <p> Categoria: ${producto.categoria}</p>
            <p> Precio: ${Number(producto.precio)} </p>
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

async function probarConexion(pagina = 1, categoria) {
    const urlBase =  "http://localhost:3000/api/productos";
    let url = `${urlBase}?page=${pagina}`;
    if (categoria) {
        url += `&categoria=${encodeURIComponent(categoria)}`;
    }

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if(datos.length === 0){
    return;
}
    paginaActual = pagina;
    categoriaActual = categoria;
    document.querySelectorAll("#contenedor-categorias button").forEach(function (boton){
        if (boton.textContent === categoriaActual) {
            boton.style.backgroundColor = "#166534";
        }else{
            boton.style.backgroundColor = "";
        }

    })
    if (paginaActual === 1) {
        botonAnterior.disabled = true; 
    }else{
        botonAnterior.disabled = false;
    }
    productos = datos;
    mostrarProductos();
    activarBotonesAgregar();
    
}
probarConexion();

let paginaActual = 1;
let categoriaActual = "";
const botonSiguiente = document.querySelector("#boton-siguiente");
botonSiguiente.addEventListener("click", function (){
    probarConexion(paginaActual +1, categoriaActual);

});

const botonAnterior = document.querySelector("#boton-anterior");
botonAnterior.addEventListener("click", function(){
    probarConexion(paginaActual - 1, categoriaActual);
});


async function cargarCategorias() {
    const respuesta = await fetch("http://localhost:3000/api/productos/categorias");
    const categorias = await respuesta.json();
    console.log(categorias);
    const contenedorCategorias = document.querySelector("#contenedor-categorias");

    let hmtlBotones= "";
    categorias.forEach(function(){
        hmtlBotones += `<button></button>`;
    })
    contenedorCategorias.innerHTML = hmtlBotones;

    const botones = contenedorCategorias.querySelectorAll("button");
    botones.forEach(function(boton,indice){
        boton.textContent = categorias[indice].categoria;
        boton.addEventListener("click", function(){
           const categoriaElegida= categorias[indice].categoria;
            
           if (categoriaActual === categoriaElegida) {
                probarConexion(1);
           }else{
            probarConexion(1, categoriaElegida);
           }

        
        }
    )

    });
   
}
cargarCategorias()

