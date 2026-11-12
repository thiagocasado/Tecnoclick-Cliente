const formulario = document.querySelector("form");
const campoNombre = document.querySelector("#nombre");
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nombre = campoNombre.value.trim();
    if (nombre==="") {
        alert("Ingresa tu nombre para continuar")
        return;
    }
   window.location.href = "productos.html";
});