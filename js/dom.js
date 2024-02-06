function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) 
}
const carro = recuperarCarrito() || []
const botonCarrito = document.querySelector("img#carrito")
const contenedor = document.querySelector("section#card")
const inputBuscar = document.querySelector("input[type=search]")


function retornarCardHTML(producto) {
    return `<div class="card"> 
                <div><h1><img src="${producto.imagen}"></h1></div>
                <div class="card-title"><p>${producto.nombre}</p></div>
                <div class="card-price"><p>$ ${producto.precio.toLocaleString("es-AR")}</p></div>
                <button id="${producto.id}" class="button button-outline button-add" title="Pulsa para comprar">COMPRAR</button>
            </div>`
}

function retornarCardError() {
    return `<div class="card-error">
                <h2>🔌</h2>
                <h3>No se han podido listar los productos</h3>
                <h4>Intenta nuevamente en unos instantes...</h4>
            </div>`
}
function buscarArticulo(artId) {
    let articuloSeleccionado = inventario.find((producto) => producto.id === parseInt(artId));
    return articuloSeleccionado;
}

function activarClickEnBotones() { 
    const botonesComprar = document.querySelectorAll("button.button-add") 
    for (let boton of botonesComprar) {
        boton.addEventListener("click", () => {
            let idProducto = boton.id;
            let articuloElegido = buscarArticulo(idProducto);

            if (articuloElegido) {
                carro.push(articuloElegido);
                localStorage.setItem("miCarrito", JSON.stringify(carro));
            } else {
                console.error("No se encontró el artículo con el ID:", idProducto);
            }
        })
    }
}
function cargarProductos(array) {
    if (array.length > 0) {
        contenedor.innerHTML = ""
        array.forEach((producto)=> {
            contenedor.innerHTML += retornarCardHTML(producto)
        })
        activarClickEnBotones()
    } else {
        contenedor.innerHTML = retornarCardError()
    }
}

cargarProductos(inventario)

botonCarrito.addEventListener("mousemove", ()=> {
    if (carro.length > 0) {
        botonCarrito.title = carro.length + " producto(s) en carrito"
    } else {
        botonCarrito.title = "Ir al carrito"
    }
})

botonCarrito.addEventListener("click", ()=> {
    if (carro.length > 0) {
        location.href = "compra.html"
    } else {
        alert("🛒 Debes agregar al menos un producto al carrito.")
    }
})

